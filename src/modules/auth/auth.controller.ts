import { Body, Controller, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { LoginBodyDto, SignupBodyDto, SignupQueryDTo } from './dto/signup.dto';



  @UsePipes(      new ValidationPipe({
        stopAtFirstError: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }))
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('auth/signup')
  signup(
    @Body(

    )
    body: SignupBodyDto,
    @Query()
    query:SignupQueryDTo
  ): { message: string; data: { userId: number } } {
    console.log(query,body);

    const id: number = this.authenticationService.signup(body);

    return { message: 'Done', data: { userId: id } };
  }

  @Post('auth/login')
  login(
    @Body() 
    body:LoginBodyDto
  ) {
    console.log(body);
    
    return { message: 'Done' };
  }
}
