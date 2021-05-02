import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SimpleUser {
  @ApiModelProperty({ example: 228 })
  id: number;

  @ApiModelProperty({ example: 'John' })
  firstName: string;

  @ApiModelProperty({ example: 'Doe' }) lastName: string;

  @ApiModelProperty({ example: 'john@doe.com' }) email: string;

  @ApiModelProperty({ example: 'Avilon NY' }) company?: string;

  @ApiModelProperty({ readOnly: true }) createdAt: Date;

  @ApiModelProperty({ readOnly: true }) updatedAt?: Date;

  @ApiModelProperty() isPrivate: boolean;

  @ApiModelProperty() bannedAt?: Date;

  @ApiModelProperty({ example: 4.51, nullable: true }) rating?: number;
}
