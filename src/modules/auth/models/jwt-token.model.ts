import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class JwtToken {
  @ApiModelProperty({
    // eslint-disable-next-line max-len
    example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQzLCJsb2dpbiI6Im1AZG9lLmNvbSIsInJvbGUiOiJFTVBMT1lFRSIsImlhdCI6MTYxNTIyMTI2MCwiZXhwIjoxNjE1MjI0ODYwfQ.3O67ewX8Vu1BG3JIUMuEZXQPCBq8qU68l9PJE8AMMZ7tluAsvbIVD90kl5_BJXqKlH8iSCASUOwddKoWsBGvAA',
  })
  accessToken: string;

  // eslint-disable-next-line max-len
  @ApiModelProperty({ example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Im1AZG9lLmNvbSIsInJvbGUiOiJFTVBMT1lFRSIsInN1YiI6NDMsImlhdCI6MTYxNTIyMDk4MCwiZXhwIjoxNjE3ODEyOTgwfQ.ydGKeyBAYEp6aZ8W-_YZYDI06hRk93p2qiD9w1EA-_MlB0jhk1INVd0h19aNGUPb9UnwoOdp597fl2EbRCuqrQ' })
  refreshToken: string;
}
