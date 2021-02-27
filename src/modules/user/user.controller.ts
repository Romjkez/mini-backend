import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SimpleUser } from './models/simple-user.model';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: SimpleUser })
  create(@Body() dto: CreateUserDto): Observable<SimpleUser> {
    return this.userService.createOne(dto);
  }

  @Post('/bulk')
  createBulk(): Observable<number> {
    return of(1);
  }

  @Get(':id')
  getById(): Observable<User> {
    return null;
  }

  @Put(':id/password')
  changePassword(
    @Param() id: number,
    @Body() body: ChangePasswordDto,
  ): Observable<void> {
    // TODO add same password validation
    return this.userService.changePassword(id, body);
  }

  @Get()
  getMany(): Observable<Array<SimpleUser>> {
    return null;
  }

  @Put()
  update(): Observable<User> {
    return null;
  }

  @Post(':id/activate')
  @HttpCode(200)
  activate(@Param('id') id: number): Observable<void> {
    return this.userService.activate(id);
  }

  @Post(':id/deactivate')
  @HttpCode(200)
  deactivate(@Param('id') id: number): Observable<void> {
    return this.userService.deactivate(id);
  }

  @Delete(':id')
  delete() {
    return null;
  }
}
