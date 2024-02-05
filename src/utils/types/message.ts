import { User } from './user';
import { Ticket } from './ticket';
import { UserOld } from './user_old';

export interface Message {
  id: number;
  message: string;
  ticket: Ticket;
  systemUser?: User;
  user?: User;
  createdAt: string;
}

export interface CreateMessage
  extends Omit<Message, 'id' | 'ticket' | 'createdAt'> {
  ticketId: number;
  // userId: number;
  // systemUserId?: number;
}
