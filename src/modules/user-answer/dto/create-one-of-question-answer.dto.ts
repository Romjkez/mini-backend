import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOneOfQuestionAnswerDto {
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
    description: 'ID of selected option',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  answer: number;
}
