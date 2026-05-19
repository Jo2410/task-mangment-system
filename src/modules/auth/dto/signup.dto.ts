import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { IsMatch } from 'src/common/decorator';






export class SignupBodyDto {
  @Length(2, 52)
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;

  //custom validation
  @IsMatch<string>(['password'])
  confirmPassword!: string;
}
