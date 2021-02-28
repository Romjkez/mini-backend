import { SimpleUser } from './simple-user.model';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Article } from '../../article/article.entity';
import { FinishedTest } from '../../finished-test/finished-test.entity';

/**
 * User with converted Articles and FinishedTests relations
 */
export class User extends SimpleUser {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  company?: string;

  @ApiModelProperty({ readOnly: true })
  createdAt: Date;

  @ApiModelProperty()
  updatedAt?: Date;

  @ApiModelProperty()
  isPrivate: boolean;

  @ApiModelProperty()
  bannedAt?: Date;

  @ApiModelProperty()
  rating: number;

  @ApiModelProperty({ type: Article, isArray: true })
  finishedArticles: Array<Article>;

  @ApiModelProperty({ type: FinishedTest, isArray: true })
  finishedTests: Array<FinishedTest>;
}
