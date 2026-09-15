import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { IUser } from '../../common';
import { SignupBodyDto } from './dto/auth.dto';
import { UserRepository } from '../../DB/repository/user.repository';
import { generateHash } from '../../common/utils/security/hash.security';
import { emailEvent } from '../../common/utils/email/email.event';

@Injectable()
export class AuthenticationService {
  private users: IUser[] = [];
  constructor(private readonly userRepository: UserRepository) {}

  async signup(data: SignupBodyDto): Promise<string> {
    const { username, email, password } = data;
    const checkUser = await this.userRepository.findOne({ filter: { email } });
    if (checkUser) {
      throw new ConflictException('email already exists');
    }
    const [user] = await this.userRepository.create({
      data:[{ username, email, password}]
    });
      if (!user) {
        throw new BadRequestException('Fail to signup this account please try again later');
      }

      emailEvent.emit('confirmEmail', {to:email, otp:"1234"})
    return 'Done';
  }


}
