import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class AddFinishedByDto {
  @ApiModelProperty()
  @IsNumberString()
  @IsNotEmpty()
  articleId: number;

  @ApiModelProperty()
  @IsNumberString()
  @IsNotEmpty()
  userId: number;
}
