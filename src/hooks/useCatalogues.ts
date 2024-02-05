import { useEffect, useState } from 'react';
import { Catalogue, Page } from '../utils/types';
import { useApiAuth } from './useApiAuth';
import queryString from 'query-string';

interface HookProps {
  programId: number;
}

const useCatalogues = ({ programId }: HookProps) => {
  const api = useApiAuth();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);

  const params = {
    programId,
  };
  const query = queryString.stringify(params);
  const getCataloguesByProgramId = async () => {
    const { data } = await api.get<Page<Catalogue>>(`/catalogues?${query}`);
    setCatalogues(data.filter((catalogue) => catalogue.mainCatalogue));
  };

  useEffect(() => {
    getCataloguesByProgramId();
  }, [programId]);

  return {
    catalogues,
    getCataloguesByProgramId,
  };
};

export default useCatalogues;
