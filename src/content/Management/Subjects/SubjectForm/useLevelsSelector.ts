import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import { Level, OptionLabel } from 'src/utils/types';

const useLevelsSelector = () => {
  const api = useApiAuth();
  const [levelOptions, setLevelOptions] = useState<OptionLabel[]>([]);

  const getLevels = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    const levels = await api.get<Level[]>('/levels?' + query);
    setLevelOptions(
      levels.map((participant) => ({
        label: participant.name,
        value: participant.id,
      }))
    );
  };

  useEffect(() => {
    getLevels();
  }, []);

  return {
    levelOptions,
  };
};

export default useLevelsSelector;
