import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBooleanString, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ExerciseFilterDto {
  @ApiModelPropertyOptional({ description: 'Title of the exercise' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @ApiModelPropertyOptional({ description: 'If the exercise should be visible to non-admin users' })
  @IsBooleanString()
  @IsNotEmpty()
  @IsOptional()
  isVisible?: boolean;
}
