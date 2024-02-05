import { User } from './user';
import { Category } from './category';
import { Message } from './message';
import { UserOld } from './user_old';
import { Attachment } from './attachment';
import { Group } from './group';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface Ticket {
  id: number;
  code: string;
  subject: string;
  body: string;
  firstName: string;
  lastName: string;
  fullName: string;
  status: TicketStatus;
  category: Category;
  group: Group;
  assignedTo: User;
  createdAt?: string;
  updatedAt?: string;
  messages?: Message[];
  requester: User;
  attachments?: Attachment[];
  members: { id: number; systemUser: User }[];
}

export interface CreateTicket
  extends Omit<
    Ticket,
    'id' | 'code' | 'category' | 'assignedTo' | 'status' | 'requester'
  > {
  groupId?: number;
  categoryId: number;
  email: string;
}

export interface UpdateTicket extends Partial<CreateTicket> {
  status?: TicketStatus;
}

export const translateStatus = (status: TicketStatus) => {
  switch (status) {
    case TicketStatus.OPEN:
      return 'Abierto';
    case TicketStatus.IN_PROGRESS:
      return 'En progreso';
    case TicketStatus.ON_HOLD:
      return 'En espera';
    case TicketStatus.RESOLVED:
      return 'Resuelto';
    case TicketStatus.CLOSED:
      return 'Cerrado';
    default:
      return '';
  }
};
