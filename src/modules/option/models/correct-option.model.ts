import { BaseOption } from './base-option.model';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CommonOption extends BaseOption {
  @ApiModelProperty({
    type: 'integer',
    minimum: 1,
    example: 1,
  })
  id: number; // TODO: remove?

  @ApiModelProperty()
  text: string;

  @ApiModelPropertyOptional({
    nullable: true,
    example: 'https://i.imgur.com/oygcF4w.jpeg',
  })
  url?: string;

  @ApiModelProperty({ type: 'boolean', nullable: false, example: false })
  isCorrect: boolean;
}
