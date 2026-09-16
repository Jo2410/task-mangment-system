import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsMatch } from '../../../common';

export class ResendConfirmEmailDto {
      @IsEmail()
  email!: string;
}

export class ConfirmEmailDto extends ResendConfirmEmailDto{
  @Matches(/^\d{6}$/)
  code!:string
}

export class LoginBodyDto extends ResendConfirmEmailDto {

  @IsStrongPassword()
  password!: string;
}

export class SignupBodyDto extends LoginBodyDto {
  @Length(2, 52)
  @IsNotEmpty()
  @IsString()
  username!: string;



  @ValidateIf((data: SignupBodyDto) => {
    return Boolean(data.password);
  })
  //custom validation
  @IsMatch<string>(['password'])
  confirmPassword!: string;
}



export class SignupQueryDTo {

  @MinLength(2)
  @IsString()
  flag!: string;
}