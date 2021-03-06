import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExactAnswerQuestionDto {
  @ApiModelProperty({
    minLength: 3,
    maxLength: 255,
    example: 'When the MINI was founded? (type 4 digits representing year)',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  text: string;

  @ApiModelProperty({ nullable: false, maxLength: 255, example: '1959' })
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiModelProperty({ type: 'integer', minimum: 1, nullable: false, example: 2 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order: number;
}
