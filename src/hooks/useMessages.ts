import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useSnackbar } from 'notistack';

import { useApiAuth } from './useApiAuth';
import { generalConfig } from 'src/config';
import { CreateMessage, Message } from 'src/utils/types';

type UseMessagesProps = {
  ticketId: number;
  // order?: 'ASC' | 'DESC';
};

export const useMessages = (params: UseMessagesProps) => {
  const { ticketId } = params || {};
  const { tenant } = generalConfig;
  // const { post, get } = useApi();
  const { get: getAuth, post } = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getMessages = async () => {
    try {
      setLoading(true);
      const queryParams = {};
      const query = queryString.stringify(queryParams);
      const response = await getAuth<Message[]>('/messages/ticket/' + ticketId);
      setMessages(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (message: CreateMessage, cb?: Function) => {
    try {
      const response = await post<Message>('/messages/system-user', {
        ...message,
        tenantId: tenant.id,
      });
      if (cb) cb();
      // enqueueSnackbar('Ticket creado', {
      //   variant: 'success',
      // });
      getMessages();
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!ticketId) return;
    getMessages();
  }, [ticketId]);

  // Loop to get new messages every 5 seconds
  useEffect(() => {
    if (!ticketId) return;
    const interval = setInterval(() => {
      getMessages();
    }, 30000);
    return () => clearInterval(interval);
  }, [ticketId]);

  return {
    createMessage,
    getMessages,
    messages,
    loading,
    error,
  };
};
