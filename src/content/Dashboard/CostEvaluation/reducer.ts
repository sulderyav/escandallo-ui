import { useReducer, useEffect } from 'react';

import { useApiAuth } from 'src/hooks';
import { Recipe } from 'src/utils/types';

type State = {
  status: 'idle' | 'loading' | 'loading-error';
  value: Recipe;
  error: null | string;
};

type Actions =
  | { type: 'loading' }
  | { type: 'load'; value: Recipe }
  | { type: 'error'; error: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'loading':
      return { ...state, status: 'loading', value: null };
    case 'load':
      return {
        ...state,
        status: 'idle',
        value: action.value,
      };
    case 'error':
      return { ...state, status: 'loading-error', error: action.error };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  value: null,
  error: null,
};

export function useRecipe(
  getValue: () => Promise<Recipe>,
  proceedToRequest = true,
  beforeRequest = () => {}
) {
  const { get } = useApiAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadOptions() {
    try {
      if (!proceedToRequest) return;
      dispatch({ type: 'loading' });
      beforeRequest();
      const response = await getValue();
      dispatch({ type: 'load', value: response });
    } catch (e: any) {
      dispatch({ type: 'error', error: e.message });
    }
  }

  useEffect(() => {
    loadOptions();
  }, [get, proceedToRequest, getValue]);

  return {
    loading: state.status === 'loading',
    loadingError: state.status === 'loading-error',
    value: state.value,
    error: state.error,
    loadOptions,
  };
}
