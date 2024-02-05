import { Address } from './address';
import { CourierTypes } from './courier';
import { Participant } from './participant';

export enum RequestTypes {
  PARTICIPANT = 'PARTICIPANT',
  PERSONAL_SHOPPER = 'PERSONAL_SHOPPER',
}

export enum StatusTypes {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  ORDERRED = 'ORDERRED',
  NEWS = 'NEWS',
  DELIVERED = 'DELIVERED',
  WAREHOUSE = 'WAREHOUSE',
  DISPATCHED = 'DISPATCHED',
  SPECIALS = 'SPECIALS',
  CANCELED = 'CANCELED',
}

export interface CreateRequestDto {
  type: RequestTypes;
  points: number;
  participantId: number;
  awardId: number;
  variantId?: number;
  addressId: number;
}

export interface Request {
  id: number;
  code: string;
  quantity: number;
  type: string;
  currentCost: number;
  usedCost: number;
  margin: number;
  points: number;
  status: StatusTypes;
  requestedAt: string;
  approvedAt: null;
  downloadedAt: null;
  orderedAt: null;
  newsAt: null;
  deliveredAt: null;
  participant: Participant;
  courier: CourierTypes;
  deliveredComment: null;
  cellarAt: null;
  dispatchedAt: null;
  dispatchedComment: null;
  specialsAt: null;
  specialsComment: null;
  canceledAt: null;
  cancelationReason: null;
  shippingGuide: null;
  shippingGuideAttachment: null;
  isDeleted: boolean;
  deletedAt: null;
  requestNew: RequestNew | null;
  variant: null;
  address: Address;
  logisticComment: string | null;
}

export type RequestNew = {
  id: number;
  anotherModel: boolean;
  anotherModelDesc: string | null;
  anotherSupplier: boolean;
  comment: string;
  constIsLessOrEqual: boolean;
  newCost: number | null;
};
