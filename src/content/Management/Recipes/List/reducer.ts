import { useEffect, useReducer } from 'react';

type State = {
  status: 'loading' | 'idle' | 'error';
  entities: any[];
};

type Actions =
  | { type: 'load'; payload: any[] }
  | { type: 'error' }
  | { type: 'handle-change'; entity: Partial<State> };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return { ...state, status: 'idle', entities: action.payload };
    case 'error':
      return { ...state, status: 'error' };
    case 'handle-change':
      return { ...state, ...action.entity };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  entities: [],
};

export function useIngredients(getEntities: () => Promise<any[]>) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const query = async () => {
      try {
        const entities = await getEntities();
        dispatch({ type: 'load', payload: entities });
      } catch (error) {
        dispatch({ type: 'error' });
      }
    };
    query();
    // }, [getEntities]);
  }, []);

  const handleChange = (prop: keyof State, value: any) => {};

  const handleMultipleChange = (fields: { [key: string]: any }) => {
    dispatch({ type: 'handle-change', entity: { ...state, ...fields } });
  };

  return {
    ...state,
    loading: state.status === 'loading',
    handleChange,
    handleMultipleChange,
  };
}
