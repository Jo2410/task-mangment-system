import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import {
  ConfirmEmailDto,
  LoginBodyDto,
  ResendConfirmEmailDto,
  SignupBodyDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signup(
    @Body()
    body: SignupBodyDto,
  ): Promise<{ message: string }> {
    console.log(body);

    await this.authenticationService.signup(body);

    return { message: 'Done' };
  }

  @Post('resend-confirm-email')
  async resendConfirmEmail(
    @Body()
    body: ResendConfirmEmailDto,
  ): Promise<{ message: string }> {
    await this.authenticationService.resendConfirmEmail(body);

    return { message: 'Done' };
  }

  @Patch('confirm-email')
  async confirmEmail(
    @Body()
    body: ConfirmEmailDto,
  ): Promise<{ message: string }> {
    await this.authenticationService.confirmEmail(body);

    return { message: 'Done' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    body: LoginBodyDto,
  ): Promise<{
    message: string;
    data: { credentials: { access_token: string; refresh_token: string } };
  }> {
    const credentials = await this.authenticationService.login(body);
    return { message: 'Done', data: { credentials } };
  }
}
