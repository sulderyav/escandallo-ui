import { useContext } from 'react';

import { ApiContext } from '../contexts/ApiContext';

export function useApiAuth() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi should be used inside ApiProvider');
  }
  return context;
}
