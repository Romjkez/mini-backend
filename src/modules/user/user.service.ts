import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepo: Repository<User>) {
  }

  create(dto: CreateUserDto){
    this.userRepo.save(dto)
  }

  createBulk() {

  }

  update() {

  }

  activate() {

  }

  deactivate() {

  }

  delete() {

  }
}
