import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class SimpleArticle {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  isVisible: boolean;

  @ApiModelProperty({ description: 'Number of users finished reading the article' })
  finishedBy: number;

  @ApiModelPropertyOptional({ example: 'https://avtotachki.com/wp-content/uploads/2020/12/37.jpg' })
  previewUrl?: string;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @ApiModelProperty()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: number;
}
