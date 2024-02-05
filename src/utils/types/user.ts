export type RoleNames = 'Super Admin' | 'Admin' ;

export type User = {
  id: number,
  avatar: string,
  username: string,
  mobile: string,
  email: string,
  fullName: string,
  firstName: string,
  lastName: string,
  roles: Role[],
};

export type Role = {
  id: number;
  codeVarchar: string;
  description: string;
  name: RoleNames;
};
