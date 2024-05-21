export type RoleNames = 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';

export type User = {
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
  isActive: boolean;
};

export type Role = {
  id: number;
  name: RoleNames;
  description: string;
};

export const parseRoleName = (role: RoleNames) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'Super Administrador';
    case 'ADMIN':
      return 'Administrador';
    case 'TEACHER':
      return 'Profesor';
    case 'STUDENT':
      return 'Estudiante';
    default:
      return '';
  }
};
