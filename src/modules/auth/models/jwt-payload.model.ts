import { UserRole } from '../../user/models/user-role.enum';

export interface JwtPayload {
  login: string;
  role: UserRole;
  sub: number;
}

export interface JwtFullPayload extends JwtPayload {
  iat: number
  exp: number
}
