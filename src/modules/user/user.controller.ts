import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { SimpleUser } from "./models/simple-user.model";
import { Observable } from "rxjs";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(): Observable<void>{

  }

  @Post('/bulk')
  createBulk(): Observable<number> {

  }

  @Get(':id')
  getById(): Observable<User> {

  }

  @Get()
  getMany(): Observable<Array<SimpleUser>> {

  }

  @Put()
  update(): Observable<User> {

  }

  @Post(':id/activate')
  activate(): Observable<User> {

  }

  @Post(':id/deactivate')
  deactivate(): Observable<User> {

  }

  @Delete(':id')
  delete() {

  }
}
