import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class GetManyResponseDto<T> {
  @ApiModelProperty({ type: Object, isArray: true, example: [] })
  data: Array<T>;

  @ApiModelProperty({ example: 1 })
  page: number;

  @ApiModelProperty({ example: 15 })
  perPage: number;

  @ApiModelProperty({ example: 228 })
  totalItems: number;
}
