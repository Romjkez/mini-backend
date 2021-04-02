import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { MIN_FIRSTNAME_LENGTH } from '../../user/dto/create-user.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class TagFilterDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @ApiModelPropertyOptional({ description: 'Tag content', example: 'Clubman' })
  text?: string;
}
