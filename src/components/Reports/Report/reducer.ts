import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useApiAuth } from 'src/hooks';

type State = {
  status: 'idle' | 'loading' | 'loading-error';
  results: null | any;
  error: null | string;
};

type Actions =
  | { type: 'loading' }
  | { type: 'load'; entity: {} }
  | { type: 'error'; error: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', results: null };
    case 'load':
      return {
        ...state,
        status: 'idle',
        results: action.entity,
      };
    case 'error':
      return { ...state, status: 'loading-error', error: action.error };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  results: null,
  error: null,
};

export function useReport(
  getEntity: (paramsReport: string) => Promise<any>,
  beforeRequest = () => {}
) {
  const { id } = useParams();
  const { get } = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadAnnouncement() {
      try {
        dispatch({ type: 'loading' });
        beforeRequest();
        if (!id) throw new Error('Hubo un error encontrando la entidad');

        const entity = await getEntity(id);

        dispatch({ type: 'load', entity });
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    loadAnnouncement();
  }, [get, id, window.location.search]);

  return {
    loading: state.status === 'loading',
    loadingError: state.status === 'loading-error',
    results: state.results,
    error: state.error,
  };
}
