import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateExerciseDto {
  @ApiModelProperty()
  title: string;

  @ApiModelPropertyOptional({ default: true })
  isVisible?: boolean;

  @ApiModelProperty({ type: 'integer', isArray: true })
  tests: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  articles: Array<number>;

  @ApiModelProperty({ type: 'integer', isArray: true })
  tags: Array<number>;
}
