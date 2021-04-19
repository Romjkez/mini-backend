import { UserAnswer } from '../../user-answer/user-answer.entity';
import { IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { CreateUserAnswerDto } from '../../user-answer/dto/create-user-answer.dto';

export class CreateFinishedTestDto {
  @ApiModelProperty({ type: 'integer', description: 'ID of user that finished the test' })
  @IsInt()
  @IsPositive()
  user: number;

  @ApiModelProperty({ type: 'integer', description: 'ID of finished test' })
  @IsInt()
  @IsPositive()
  test: number;

  @Type(() => UserAnswer)
  @ValidateNested()
  @IsArray()
  @IsNotEmpty()
  answers: Array<CreateUserAnswerDto>;
}
