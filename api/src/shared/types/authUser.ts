export type AuthRole = {
  id: number;
  name: string;
};

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  roles: AuthRole[];
};
