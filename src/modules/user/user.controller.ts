import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { SimpleUser } from './models/simple-user.model';
import { Observable, of } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { IdDto } from '../../common/dto/id.dto';
import { catchError } from 'rxjs/operators';

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


  @ApiParam({ type: Number, name: 'id' })
  @Get(':id')
  getById(@Param() params: IdDto): Observable<User> {
    return this.userService.getById(params.id);
  }

  @ApiParam({ type: Number, name: 'id' })
  @Put(':id/password')
  changePassword(
    @Param() params: IdDto,
    @Body() body: ChangePasswordDto,
  ): Observable<void> {
    if (body.oldPassword === body.newPassword) {
      throw new BadRequestException('Old and new passwords must not be equal');
    }
    return this.userService.changePassword(params.id, body).pipe(
      catchError(err => {
        throw new InternalServerErrorException(err?.response || err);
      }),
    );
  }

  @Get()
  getMany(): Observable<Array<SimpleUser>> {
    return null;
  }

  @ApiParam({ type: Number, name: 'id' })
  @Put()
  update(@Param() params: IdDto): Observable<User> {
    return null;
  }

  @ApiParam({ type: Number, name: 'id' })
  @Post(':id/activate')
  @HttpCode(200)
  activate(@Param() params: IdDto): Observable<void> {
    return this.userService.activate(params.id);
  }

  @ApiParam({ type: Number, name: 'id' })
  @Post(':id/deactivate')
  @HttpCode(200)
  deactivate(@Param() params: IdDto): Observable<void> {
    return this.userService.deactivate(params.id);
  }

  @ApiParam({ type: Number, name: 'id' })
  @Delete(':id')
  delete(@Param() params: IdDto): Observable<void> {
    return null;
  }
}
