import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import AuthCredentialsDto from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

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
  test(@GetUser('User') req: User) {
    console.log(req);
    return req;
  }
}
