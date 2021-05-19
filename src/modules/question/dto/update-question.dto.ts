import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @ApiModelPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  text?: string;
}
