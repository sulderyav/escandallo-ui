// export type UserRole = 'SUPER_ADMIN' | 'AD' | 'SL' | 'SP';

export type UserOld = {
  id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export interface UserLoginData {
  email: string;
  code: string;
}
