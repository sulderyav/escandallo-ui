import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useApiAuth } from './useApiAuth';
import { OptionLabel, Ingredient } from 'src/utils/types';

export const useIngredientsSelector = () => {
  const api = useApiAuth();
  const [ingredientsOptions, setIngredients] = useState<OptionLabel[]>([]);

  const getIngredients = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    const ingredients = await api.get<Ingredient[]>('/ingredients?' + query);
    setIngredients(
      ingredients.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient.id,
        meassurementType: ingredient.meassurementType,
      }))
    );
  };

  useEffect(() => {
    getIngredients();
  }, []);
  return {
    ingredientsOptions,
  };
};

export default useIngredientsSelector;
