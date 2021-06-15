import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArticleFilterDto {
  @ApiModelPropertyOptional({ description: 'Title of the article', minLength: 3 })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiModelPropertyOptional({ description: 'Is article owned by exercise ' })
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  isInExercise?: boolean;
}
