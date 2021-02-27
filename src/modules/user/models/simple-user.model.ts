import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SimpleUser {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  company?: string;

  @ApiModelProperty({ readOnly: true })
  createdAt: number;

  @ApiModelProperty()
  updatedAt?: number;

  @ApiModelProperty()
  isPrivate: boolean;

  @ApiModelProperty()
  rating: number;
}
