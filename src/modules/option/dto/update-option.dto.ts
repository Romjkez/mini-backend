import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';


export class UpdateOptionDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @IsOptional()
  @ApiModelPropertyOptional({ example: '1st of May, 1960', nullable: false, maxLength: 255 })
  text?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({
    nullable: true,
    example: 'https://i.imgur.com/oygcF4w.jpeg',
  })
  url?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiModelPropertyOptional({ nullable: true, example: 1, minimum: 1 })
  order?: number;
}
