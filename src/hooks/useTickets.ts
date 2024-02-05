import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useSnackbar } from 'notistack';

import { useApiAuth } from './useApiAuth';
import { generalConfig } from 'src/config';
import {
  CreateTicket,
  Ticket,
  TicketStatus,
  UpdateTicket,
} from 'src/utils/types';

type UseItemsProps = {
  order?: 'ASC' | 'DESC';
  statuses?: TicketStatus[];
};

export const useTickets = (params: UseItemsProps = {}) => {
  // const { order = 'DESC' } = params;
  const { tenant } = generalConfig;
  const { get, post } = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] = useState<Partial<UseItemsProps>>(params);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getTickets = async () => {
    try {
      setLoading(true);
      const queryParams = {
        ...(Object.keys(filters).reduce((acc, key) => {
          if (filters[key]) {
            acc[key] = filters[key];
          }
          return acc;
        }, {}) as UseItemsProps),
      };
      const query = queryString.stringify(queryParams);
      const response = await get<Ticket[]>('/tickets/my-tickets?' + query);
      setTickets(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getOneTicket = async (code: string) => {
    try {
      setLoading(true);
      const response = await get<Ticket>(`/tickets/code/${code}`);
      return response;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (
    filters: Partial<UseItemsProps>,
    replace = false
  ) => {
    if (replace) {
      setFilters(filters);
    } else {
      setFilters((prev) => ({
        ...prev,
        ...filters,
      }));
    }
  };

  const updateTicket = async (
    ticketId: number,
    updates: Partial<UpdateTicket>,
    cb?: Function
  ) => {
    try {
      setLoading(true);
      const response = await post<Ticket>(`/tickets/${ticketId}`, updates);
      if (cb) cb();
      return response;
    } catch (error) {
      setError(error);
      console.error('updateTicket() -> ', error);
    }
  };

  useEffect(() => {
    getTickets();
  }, [filters]);

  return {
    getTickets,
    tickets,
    loading,
    error,
    getOneTicket,
    handleFiltersChange,
    updateTicket,
  };
};
