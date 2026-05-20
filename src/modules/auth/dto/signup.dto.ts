import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsMatch } from 'src/common';

export class LoginBodyDto {
    @IsEmail()
  email!: string;

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