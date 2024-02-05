import React from 'react';
import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';

import useAuth from '../../../hooks/useAuth';
import { RoleNames } from 'src/utils/types';

interface ConditionalProps {
  children: ReactNode;
  roles: RoleNames[];
}
const ConditionalRender: FC<ConditionalProps> = ({ children, roles }) => {
  roles.push('Super Admin'); // Always add Super Admin role to the roles array
  const { user } = useAuth();

  if (roles.filter((rol) => user.roles[0]?.name === rol)[0]) {
    return <>{children}</>;
  }
  return null;
};

export default ConditionalRender;
