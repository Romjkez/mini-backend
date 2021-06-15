import { Test } from '../test.entity';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TestFilterDto {
  @ApiModelPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isVisible?: Pick<Test, 'isVisible'>;

  @ApiModelPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: Pick<Test, 'title'>;

  @ApiModelPropertyOptional({ description: 'Is test owned by exercise' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isInExercise?: boolean;
}
