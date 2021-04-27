import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateExactAnswerQuestionAnswerDto {
  @ApiModelProperty({
    type: 'string',
    description: 'ID of answered question',
    example: 'da7e2127-24f6-4eaa-ac1b-8528a9be543f',
  })
  @IsUUID('all')
  @IsNotEmpty()
  question: string;

  @ApiModelProperty({
    type: 'string',
    description: 'Answer for the question',
    example: '1959',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}
