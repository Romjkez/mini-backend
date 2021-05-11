import { Test } from '../test.entity';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class TestFilterDto {
  @ApiModelPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  isVisible?: Pick<Test, 'isVisible'>;
}
