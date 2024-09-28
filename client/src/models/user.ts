export interface User {
  id: number;
  name: string;
  position?: string;
  email: string;
  last_login: string;
  registration_time: string;
  status: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  token: string;
}
