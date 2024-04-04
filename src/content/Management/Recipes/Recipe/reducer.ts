import { useEffect, useReducer } from 'react';

import { Recipe } from 'src/utils/types';

type State = {
  status: 'loading' | 'idle' | 'error';
  recipe: Recipe;
};

type Actions = { type: 'load'; payload: Recipe } | { type: 'error' };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return { ...state, status: 'idle', recipe: action.payload };
    case 'error':
      return { ...state, status: 'error' };
    default:
      return state;
  }
};

const initialState: State = {
  status: 'loading',
  recipe: null,
};

export function useRecipes(
  getEntities: () => Promise<Recipe>,
  proceedToRequest = true
) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const query = async () => {
      try {
        if (!proceedToRequest) return;
        const recipe = await getEntities();
        dispatch({ type: 'load', payload: recipe });
      } catch (error) {
        dispatch({ type: 'error' });
      }
    };
    query();
    // }, [getEntities]);
  }, [proceedToRequest]);

  return {
    ...state,
    loading: state.status === 'loading',
  };
}
