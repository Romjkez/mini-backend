import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Tag } from '../../tag/tag.entity';

export class Article {
  @ApiModelProperty({ example: 1 })
  id: number;

  @ApiModelProperty({ example: 'История основателей MINI', nullable: false })
  title: string;

  @ApiModelPropertyOptional({ nullable: true, example: 'https://www.youtube.com/watch?v=mU4TZ99yAdo' })
  video?: string;

  @ApiModelPropertyOptional({ example: 'Content of the article blah blah blah', nullable: false })
  content?: string;

  @ApiModelProperty({ example: true })
  isVisible: boolean;

  @ApiModelProperty({ description: 'Number of users finished reading the article', example: 123 })
  finishedBy: number;

  @ApiModelProperty({ description: 'Number of users added this article to their favorites', example: 1337 })
  favoriteFor: number;

  @ApiModelPropertyOptional({ example: 'https://avtotachki.com/wp-content/uploads/2020/12/37.jpg' })
  previewUrl?: string;

  @ApiModelProperty({ readOnly: true })
  createdAt: Date;

  @ApiModelProperty()
  updatedAt?: Date;

  @ApiModelProperty({ isArray: true, type: Tag })
  tags: Array<Tag>;
}
