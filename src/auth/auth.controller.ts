import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.login(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
