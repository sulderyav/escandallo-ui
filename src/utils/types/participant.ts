import { Group } from "./group";
import { Position } from "./positions";
import { Program } from "./program";

export interface Participant {
  id: number;
  username: string;
  identifier: string;
  document: string;
  password: string;
  avatar: string;
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  isActive: boolean;
  position:Position;
  group:Group;
  supervisor:Participant;
  isApproved: boolean;
  dateOfBirth: string;
  activatedAt: null;
  isAConsumerOwner: boolean;
  program: Program;
  isAConsumerRegistrar: boolean;
  isDeleted: boolean;
  deletedAt: null;
}

export interface CreateParticipant extends Omit<Participant, "id"> {
  programId: number;
  groupId: number;
  positionId: number;
  supervisorId: number;
}

export type ParticipantLevel = {
  id: number;
  level: number;
  name: string;
  hierarchy: string;
  cxp: number;
  maxPoints: number;
  maxPointsPerMonth: number;
  minimumInvoices: number | null;
  resultsBasedOnLowerLevel: boolean;
};
