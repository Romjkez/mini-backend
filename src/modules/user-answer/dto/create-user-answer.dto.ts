import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserAnswerDto {
  @ApiModelProperty({
    type: 'string',
    description: 'ID of answered question',
    example: 'da7e2127-24f6-4eaa-ac1b-8528a9be543f',
  })
  @IsUUID('all')
  question: string;

  @ApiModelProperty({
    type: 'integer',
    isArray: true,
    description: 'IDs of selected options. For order questions order matters',
    example: [1],
  })
  @IsArray()
  @IsNotEmpty()
  answer: Array<number>;
}
