import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { LoginBodyDto, SignupBodyDto } from './dto/signup.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('auth/signup')
  signup(
    @Body(new ValidationPipe({ stopAtFirstError: true, whitelist: true }))
    body: SignupBodyDto,
  ): { message: string; data: { userId: number } } {
    console.log(body);

    const id: number = this.authenticationService.signup(body);

    return { message: 'Done', data: { userId: id } };
  }

  @Post('auth/login')
  login(
    @Body()
    body: LoginBodyDto,
  ) {
    console.log(body);

    return { message: 'Done' };
  }
}
