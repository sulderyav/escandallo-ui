import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useApiAuth } from 'src/hooks';

type State = {
  status: 'idle' | 'loading' | 'loading-error' | 'deleting' | 'deleting-error';
  entity: null | any;
  error: null | string;
};

type Actions =
  | { type: 'load'; entity: {} }
  | { type: 'error'; error: string }
  | { type: 'delete' }
  | { type: 'delete-error'; error: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        status: 'idle',
        entity: action.entity,
      };
    case 'error':
      return { ...state, status: 'loading-error', error: action.error };
    case 'delete':
      return { ...state, status: 'deleting' };
    case 'delete-error':
      return { ...state, status: 'deleting-error', error: action.error };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  entity: null,
  error: null,
};

export function useEntity(
  getEntity: (id: string) => Promise<any>,
  deleteEntity: (id: string) => Promise<void>
) {
  const { id } = useParams();
  const { get } = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        if (state.status === 'deleting') return;
        if (!id) {
          throw new Error('Hubo un error encontrando la entidad');
        }
        const entity = await getEntity(id);
        dispatch({ type: 'load', entity });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    loadAnnouncement();
  }, [get, getEntity, id]);

  const handleDelete = async (cb = () => {}) => {
    try {
      dispatch({ type: 'delete' });
      await deleteEntity(id);
      cb();
      dispatch({ type: 'load', entity: null });
    } catch (e) {
      dispatch({ type: 'delete-error', error: e.message });
    }
  };

  return {
    loading: state.status === 'loading',
    loadingError: state.status === 'loading-error',
    entity: state.entity,
    error: state.error,
    deleting: state.status === 'deleting',
    deletingError: state.status === 'deleting-error',
    handleDelete,
  };
}
