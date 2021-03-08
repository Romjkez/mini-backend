import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class RefreshTokenDto {
  // eslint-disable-next-line max-len
  @ApiModelProperty(
    {    // eslint-disable-next-line max-len
      example: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQzLCJsb2dpbiI6Im1AZG9lLmNvbSIsInJvbGUiOiJFTVBMT1lFRSIsImlhdCI6MTYxNTIyMTE2MCwiZXhwIjoxNjE1MjI0NzYwfQ.6pquKF5i6QbW2qcGsxc7TWGZCLi2qij4cT9oL3rvKlcWTPJf5baSfNRSRkbxh9yyfUslHINnL5LSlkM5am7Ofg',
    })
  refreshToken: string;
}
