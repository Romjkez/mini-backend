import { GetManyDto } from '../../../common/dto/get-many.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ArticleSortDto } from './article-sort.dto';
import { ArticleFilterDto } from './article-filter.dto';

export class GetManyArticlesDto extends GetManyDto {
  @ValidateNested()
  @Type(() => ArticleSortDto)
  @ApiModelPropertyOptional()
  @IsOptional()
  sort?: ArticleSortDto;

  @ValidateNested()
  @Type(() => ArticleFilterDto)
  @ApiModelPropertyOptional()
  @IsOptional()
  filter?: ArticleFilterDto;

}
