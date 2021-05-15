import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class Seeder {
  constructor(private readonly userService: UserService) {
  }

  seed(): Observable<number> {
    return this.userService.seed();
  }
}
