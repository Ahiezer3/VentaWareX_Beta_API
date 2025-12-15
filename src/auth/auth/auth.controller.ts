import { Controller, Post, Body } from '@nestjs/common';
import { MyResponse } from 'src/response/MyResponse';
import { AuthService } from 'src/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: any) {

    let response = new MyResponse();

    return await response.generateResponse(() => this.authService.login(loginDto));

  }
}
