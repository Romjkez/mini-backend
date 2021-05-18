import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import { Observable } from 'rxjs';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtToken } from './models/jwt-token.model';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOkResponse({ type: JwtToken })
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: ValidateUserDto): Observable<JwtToken> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Refresh current user session' })
  @ApiOkResponse({ type: JwtToken })
  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() dto: RefreshTokenDto): Observable<JwtToken> {
    return this.authService.refresh(dto.refreshToken);
  }

  @ApiOperation({ summary: 'Finish current user session' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post('logout')
  logout(@Body() dto: RefreshTokenDto): Observable<void> {
    return this.authService.logout(dto.refreshToken);
  }
}
