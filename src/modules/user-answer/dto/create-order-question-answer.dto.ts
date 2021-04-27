import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderQuestionAnswerDto {
  @ApiModelProperty({
    type: 'string',
    description: 'ID of answered question',
    example: 'da7e2127-24f6-4eaa-ac1b-8528a9be543f',
  })
  @IsUUID('all')
  @IsNotEmpty()
  question: string;

  @ApiModelProperty({
    type: 'integer',
    description: 'IDs of selected options',
    example: [1],
    isArray: true,
  })
  @IsArray()
  @IsNotEmpty()
  answer: Array<number>;
}
