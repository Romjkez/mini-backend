import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class JwtToken {
  @ApiModelProperty({
    // eslint-disable-next-line max-len
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyQGRvZS5jb20iLCJpZCI6MzAsInJvbGUiOiJFTVBMT1lFRSIsImlhdCI6MTYxNDg5MTc2MywiZXhwIjoxNjE0ODkxNzY2fQ.bnmalISzXmp6fyJd1HWIq8Iuni8daLox8Vatx2Fveoo',
  })
  accessToken: string;

  @ApiModelProperty({ example: '' })
  refreshToken: string;
}
