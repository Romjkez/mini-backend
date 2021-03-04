import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { JwtToken } from './models/jwt-token.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: ValidateUserDto): Observable<JwtToken> {
    return this.authService.login(dto);
  }
}
