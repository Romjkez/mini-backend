import { CreateUserDto } from "./create-user.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateUserInternalDto extends CreateUserDto {
  @ApiModelProperty()
  password: string;
}
