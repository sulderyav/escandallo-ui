import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useSnackbar } from 'notistack';

import { useApiAuth } from './useApiAuth';
import { generalConfig } from 'src/config';
import {
  CreateTicket,
  Meta,
  Page,
  Ticket,
  TicketStatus,
  UpdateTicket,
} from 'src/utils/types';

export type UseWorkingTicketsProps = {
  order?: 'ASC' | 'DESC';
  statuses?: TicketStatus[];
  toSearch?: string;
};

export const useWorkingTickets = (params: UseWorkingTicketsProps = {}) => {
  const { tenant } = generalConfig;
  const { get, put } = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [filters, setFilters] =
    useState<Partial<UseWorkingTicketsProps>>(params);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [meta, setMeta] = useState<Meta>();
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
        }, {}) as UseWorkingTicketsProps),
      };
      const query = queryString.stringify(queryParams);
      const response = await get<Page<Ticket>>('/tickets/for-work?' + query);
      setTickets(response.data);
      setMeta(response.meta);
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
    filters: Partial<UseWorkingTicketsProps>,
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
      const response = await put<Ticket>(`/tickets/${ticketId}`, updates);
      if (cb) cb();
      getTickets();
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
    meta,
    updateTicket,
  };
};
