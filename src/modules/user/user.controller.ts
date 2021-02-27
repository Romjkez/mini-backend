import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { SimpleUser } from './models/simple-user.model';
import { Observable, of } from "rxjs";
import { CreateUserDto } from "./dto/create-user.dto";
// eslint-disable
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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

  @Get()
  getMany(): Observable<Array<SimpleUser>> {
    return null;
  }

  @Put()
  update(): Observable<User> {    return null;
  }

  @Post(':id/activate')
  activate(): Observable<User> {    return null;
  }

  @Post(':id/deactivate')
  deactivate(): Observable<User> {    return null;
  }

  @Delete(':id')
  delete() {    return null;
  }
}
