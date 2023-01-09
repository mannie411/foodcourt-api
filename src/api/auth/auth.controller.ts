import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { User } from 'src/models';
import { AuthDTO, UserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() payload: AuthDTO) {
    return this.authService.login(payload);
  }

  @Post('register')
  register(@Body() payload: UserDTO) {
    return this.authService.register(payload);
  }
}
