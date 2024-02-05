import React, { useEffect, useState } from 'react';
import { useApiAuth } from './useApiAuth';
import { AccountBalanceResponse } from 'src/utils/types';
import queryString from 'query-string';

export const useAccountBalanceByMonth = (
  participantId: number,
  month: number,
  year: number
) => {
  const [accountBalance, setAccountBalance] = useState(null);
  const api = useApiAuth();
  const params = {
    month,
    year,
  };
  const query = queryString.stringify(params);
  const getAccountBalance = async () => {
    const points = await api.get<any>(
      `/points/account-statement/${participantId}?${query}`
    );
    setAccountBalance(points);
  };
  useEffect(() => {
    getAccountBalance();
  }, []);
  return {
    accountBalance,
  };
};

export default useAccountBalanceByMonth;
