import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { LoginBodyDto, SignupBodyDto } from './dto/signup.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('auth/signup')
  async signup(
    @Body()
    body: SignupBodyDto,
  ): Promise<{ message: string }> {
    console.log(body);

    await this.authenticationService.signup(body);

    return { message: "Done" };
  }

  @Post('auth/login')
  async login(
    @Body()
    body: LoginBodyDto,
  ) {
    console.log(body);

    return { message: 'Done' };
  }
}
