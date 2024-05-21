import { useEffect, useState } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import { OptionLabel, Role } from 'src/utils/types';

const useRolesSelector = () => {
  const api = useApiAuth();
  const [roleOptions, setRoleOptions] = useState<OptionLabel[]>([]);

  const getRoles = async () => {
    const params = {};
    const query = queryString.stringify(params);
    const roles = await api.get<Role[]>('/roles?' + query);
    setRoleOptions(
      roles.map((participant) => ({
        label: participant.name,
        value: participant.id,
      }))
    );
  };

  useEffect(() => {
    getRoles();
  }, []);

  return {
    roleOptions,
  };
};

export default useRolesSelector;
