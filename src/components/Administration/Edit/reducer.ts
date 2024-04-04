import { useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type State = {
  status: 'idle' | 'loading' | 'updating' | 'error';
  entity: null | {};
  error: null | string;
};

type Actions =
  | { type: 'load'; entity: {} }
  | { type: 'request-update' }
  | { type: 'error'; error: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return { ...state, status: 'idle', entity: action.entity };
    case 'request-update':
      return { ...state, status: 'updating' };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  entity: null,
  error: null,
};

export function useEditEntity(
  onUpdateSuccess: (message: string) => void,
  loadEntity: (id: string) => Promise<any>,
  updateEntity: (entity: any, id: string) => Promise<void>,
  successMessage: string = 'Actualizado correctamente'
) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function load() {
      try {
        if (!id) {
          throw new Error('No se pudo encontrar el id de la entidad');
        }
        const entity = await loadEntity(id);
        dispatch({ type: 'load', entity });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    load();
  }, [loadEntity, id]);
  async function update(entity: any) {
    dispatch({ type: 'request-update' });
    try {
      if (!id) {
        throw new Error('No se pudo encontrar el id de la entidad');
      }
      await updateEntity(entity, id);
      // goBack();
      onUpdateSuccess(successMessage);
      navigate(-1);
    } catch (error) {
      dispatch({ type: 'error', error: error.message });
    }
  }
  return {
    loading: state.status === 'loading',
    updating: state.status === 'updating',
    error: state.error,
    entity: state.entity,
    update,
  };
}
