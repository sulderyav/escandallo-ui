import { User } from './user';
import { Ticket } from './ticket';
import { UserOld } from './user_old';

export interface Attachment {
  id: number;
  url: string;
  // tenant: Tenant
  ticket: Ticket;
  user?: User;
  systemUser?: User;
}
