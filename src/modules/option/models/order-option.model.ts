import { BaseOption } from './base-option.model';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class OrderOption extends BaseOption {
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

  @ApiModelPropertyOptional({ nullable: false, example: 1, description: 'Order number of option' })
  order: number;
}
