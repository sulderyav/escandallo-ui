import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import { OptionLabel, Recipe } from 'src/utils/types';

const useIngredientsSelector = () => {
  const api = useApiAuth();
  const [recipeOptions, setRecipes] = useState<OptionLabel[]>([]);

  const getIngredients = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    const recipes = await api.get<Recipe[]>('/recipes?' + query);
    setRecipes(
      recipes.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient.id,
      }))
    );
  };

  useEffect(() => {
    getIngredients();
  }, []);
  return {
    recipeOptions,
  };
};

export default useIngredientsSelector;
