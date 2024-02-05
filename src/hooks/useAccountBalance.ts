import React, { useEffect, useState } from 'react';
import { useApiAuth } from './useApiAuth';
import { AccountBalanceResponse } from 'src/utils/types';

export const useAccountBalance = (participantId: number) => {
  const [accountBalance, setAccountBalance] =
    useState<AccountBalanceResponse>(null);
  const api = useApiAuth();
  const getAccountBalance = async () => {
    const points = await api.get<AccountBalanceResponse>(
      `/points/account-statement/${participantId}`
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

export default useAccountBalance;
