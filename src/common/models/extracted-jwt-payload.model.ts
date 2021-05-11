import { JwtPayload } from '../../modules/auth/models/jwt-payload.model';

export interface ExtractedJwtPayload {
  readonly jwtPayload: JwtPayload;
}
