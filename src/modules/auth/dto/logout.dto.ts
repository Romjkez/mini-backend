import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LogoutDto {
  @ApiModelProperty({ type: 'string', nullable: false })
  readonly refreshToken: string;
}
