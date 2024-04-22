import { FC, ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import Login from 'src/content/pages/Auth/Login/Cover';

interface AuthenticatedProps {
  children: ReactNode;
}

const Authenticated: FC<AuthenticatedProps> = (props: { children: any }) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!auth.isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <Login />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // TODO: Redirect based on user role
  if (location.pathname === '/') {
    // FYI: This is where the main page redirection happens
    return <Navigate to="/management/recipes" replace />;
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node,
};

export default Authenticated;
