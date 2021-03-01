import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IdDto } from '../../common/dto/id.dto';
import { User } from './models/user.model';
import { CreateUserBulkDto } from './dto/create-user-bulk.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetManyUsersDto } from './dto/get-many-users.dto';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleUser } from './models/simple-user.model';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiCreatedResponse({ type: User })
  create(@Body() dto: CreateUserDto): Observable<User> {
    return this.userService.createOne(dto);
  }

  @Post('/bulk')
  @ApiCreatedResponse({ type: User, isArray: true })
  createBulk(@Body() dto: CreateUserBulkDto): Observable<Array<User>> {
    return this.userService.createBulk(dto);
  }

  @ApiOkResponse({ type: User })

  @Get(':id')
  getById(@Param() params: IdDto): Observable<User> {
    return this.userService.getById(params.id);
  }

  @ApiOkResponse({ type: GetManyResponseDto })
  @Post('getMany')
  @HttpCode(200)
  getMany(@Body() dto: GetManyUsersDto): Observable<GetManyResponseDto<SimpleUser>> {
    return this.userService.getMany(dto);
  }


  @Put(':id/password')
  changePassword(@Param() params: IdDto, @Body() body: ChangePasswordDto): Observable<void> {
    if (body.oldPassword === body.newPassword) {
      throw new BadRequestException('Old and new passwords must not be equal');
    }
    return this.userService.changePassword(params.id, body).pipe(
    );
  }

  @ApiOkResponse({ type: User })

  @Put(':id')
  update(@Param() params: IdDto, @Body() dto: UpdateUserDto): Observable<User> {
    return this.userService.update(params.id, dto);
  }


  @Post(':id/activate')
  @HttpCode(200)
  activate(@Param() params: IdDto): Observable<void> {
    return this.userService.activate(params.id);
  }


  @Post(':id/deactivate')
  @HttpCode(200)
  deactivate(@Param() params: IdDto): Observable<void> {
    return this.userService.deactivate(params.id);
  }


  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return this.userService.delete(params.id);
  }
}
