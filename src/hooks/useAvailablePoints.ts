import React, { useEffect, useState } from 'react';
import { useApiAuth } from './useApiAuth';

export const useAvailablePoints = (participantId: number) => {
  const [availablePoints, setAvailablePoints] = useState(0);
  const api = useApiAuth();

  const getAvailablePoints = async () => {
    if (participantId) {
      const points = await api.get<number>(
        `/points/available-points/${participantId}`
      );
      setAvailablePoints(points);
    }
  };

  useEffect(() => {
    getAvailablePoints();
  }, [participantId]);
  return {
    availablePoints,
  };
};

export default useAvailablePoints;
