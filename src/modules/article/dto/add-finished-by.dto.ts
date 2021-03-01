import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AddFinishedByDto {
  @ApiModelProperty()
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  articleId: number;

  @ApiModelProperty()
  @Transform(Number)
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;
}
