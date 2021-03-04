import { UserRole } from '../../user/models/user-role.enum';

export interface JwtPayload {
  sub: string;
  exp: string;
  login: string;
  role: UserRole;
}
