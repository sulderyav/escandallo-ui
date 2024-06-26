import { Level } from './level';

export type RoleNames = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: number;
  avatar: string;
  username: string;
  mobile: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  roles: Role[];
  levels: Level[];
  isActive: boolean;
}

export type Role = {
  id: number;
  name: RoleNames;
  description: string;
};

export interface CreateUser
  extends Omit<
    User,
    'id' | 'createdAt' | 'roles' | 'fullName' | 'avatar' | 'levels'
  > {
  avatar?: string;
  roleIds: number[];
  levelIds?: number[];
  password: string;
}

export interface EditUser extends Partial<CreateUser> {}

export const parseRoleName = (role: RoleNames) => {
  switch (role) {
    case 'SUPER_ADMIN':
      // return 'Super Administrador';
      return 'Profesor';
    case 'ADMIN':
      return 'Administrador';
    case 'TEACHER':
      return 'Profesor';
    case 'STUDENT':
      return 'Estudiante';
    default:
      return 'N/A';
  }
};
