import { SimpleUser } from './simple-user.model';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserRole } from './user-role.enum';

/**
 * User with converted Articles and FinishedTests relations
 */
export class User extends SimpleUser {
  @ApiModelProperty({ description: 'Unique identifier' })
  id: number;

  @ApiModelProperty({ description: 'First name' })
  firstName: string;

  @ApiModelProperty({ description: 'Last name' })
  lastName: string;

  @ApiModelProperty({ description: 'Email' })
  email: string;

  @ApiModelProperty({ description: 'Employer of user' })
  company?: string;

  @ApiModelProperty({ readOnly: true, description: 'Account creation date' })
  createdAt: Date;

  @ApiModelProperty({ readOnly: true, description: 'Last account update' })
  updatedAt?: Date;

  @ApiModelProperty({ description: 'If user prefers to hide profile from users rating' })
  isPrivate: boolean;

  @ApiModelProperty({ description: 'Account ban date-time (activation status)' })
  bannedAt?: Date;

  @ApiModelProperty({ description: 'Average test score', nullable: true })
  rating?: number;

  @ApiModelProperty({ type: Number, example: 23 })
  finishedArticles: number;

  @ApiModelProperty({ type: Number, example: 21 })
  finishedTests: number;

  @ApiModelProperty({ type: Number, example: 1 })
  favoriteArticles: number;

  @ApiModelProperty({ enum: Object.keys(UserRole), example: UserRole.EMPLOYEE })
  role: UserRole;
}
