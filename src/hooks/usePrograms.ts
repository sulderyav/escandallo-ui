import { useEffect, useState } from 'react';
import { OptionLabel, Page, Program } from 'src/utils/types';
import { useApiAuth } from './useApiAuth';
import queryString from 'query-string';

export const usePrograms = () => {
  const api = useApiAuth();
  const [programs, setPrograms] = useState<OptionLabel[]>([]);
  const getPrograms = async () => {
    const params = {
      take: 100,
      page: 1,
    };

    const { data: programsData } = await api.get<Page<Program>>(
      `/programs?${queryString.stringify(params)}`
    );
    setPrograms(
      programsData.map((program: Program) => ({
        label: program.name,
        value: program.id?.toString(),
      }))
    );
  };
  useEffect(() => {
    getPrograms();
  }, []);
  return { programs };
};
