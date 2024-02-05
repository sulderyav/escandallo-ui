import { OptionLabel } from "./common";
import { Group } from "./group";
import { Participant } from "./participant";
import { Sku } from "./sku";

export interface ParticipantInvoice {
  id: number;
  imageUrl: string;
  imageProofUrl: string;
  identifier: null | string;
  date: null | string;
  status: string;
  statusVarchar: null;
  haveAlreadyEarnedPoints: boolean;
  participant: Participant;
  group: Group;
  snapsItems: SnapItems[];
  total?: number;
  subtotal?: number;
  uploadComment: null;
  comment: null | string;
  document: null | string;
  isDeleted: boolean;
  deletedAt: null;
  createdAt: string;
}

export interface SnapItems {
  id: number;
  quantity: number;
  haveAlreadyEarnedPoints: boolean;
  isDeleted: boolean;
  deletedAt: null;
  unitPrice?: number;
  sku: Sku;
  total?: number;
  selectedSkuId?: number | null; // I use this only to create  participant invoice detais
  availableSkus?: OptionLabel[]; // I use this only to create a participant invoice detail
}

export enum SnapStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  PENDING = "PENDING",
  FOR_DATA = "FOR_DATA",
}
