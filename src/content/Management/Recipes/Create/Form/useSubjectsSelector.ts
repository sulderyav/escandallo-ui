import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import { OptionLabel, Subject } from 'src/utils/types';

const useIngredientsSelector = () => {
  const api = useApiAuth();
  const [subjectOptions, setSubjects] = useState<OptionLabel[]>([]);

  const getIngredients = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    const subjects = await api.get<Subject[]>('/subjects?' + query);
    console.log('subjects', subjects);
    setSubjects(
      subjects.map((ingredient) => ({
        label: ingredient.name,
        value: ingredient.id,
      }))
    );
  };

  useEffect(() => {
    getIngredients();
  }, []);
  return {
    ingredientsOptions: subjectOptions,
  };
};

export default useIngredientsSelector;
