import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserAnswerDto {
  @ApiModelProperty({ type: 'integer', description: 'ID of answered question' })
  @IsUUID('all')
  question: string;

  @ApiModelProperty({
    type: 'integer',
    isArray: true,
    description: 'IDs of selected options. For order questions order matters',
  })
  @IsArray()
  @IsNotEmpty()
  answer: Array<number>;
}
