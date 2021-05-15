import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/user/models/user-role.enum';

export const Roles = (...roles: Array<UserRole>) => SetMetadata('roles', roles);
