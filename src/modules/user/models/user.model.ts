import { SimpleUser } from './simple-user.model';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Article } from '../../article/article.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

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

  @ApiModelProperty({ description: 'Average test score' })
  rating: number;

  @ApiModelProperty({ type: Article, isArray: true })
  finishedArticles: Array<Article>;

  @ApiModelProperty({ type: FinishedTest, isArray: true })
  finishedTests: Array<FinishedTest>;
}