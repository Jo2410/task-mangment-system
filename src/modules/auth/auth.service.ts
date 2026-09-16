import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../../common';
import {
  ConfirmEmailDto,
  ResendConfirmEmailDto,
  SignupBodyDto,
} from './dto/auth.dto';
import { UserRepository } from '../../DB/repository/user.repository';
import { emailEvent } from '../../common/utils/email/email.event';
import { OtpRepository } from '../../DB/repository/otp.repository';
import { OtpEnum } from '../../common/enum/otp.enum';
import { Types } from 'mongoose';
import { createNumericalOtp } from '../../common/utils/otp';
import { SecurityService } from '../../common/services/security.service';

@Injectable()
export class AuthenticationService {
  private users: IUser[] = [];
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpRepository,
    private readonly securityService: SecurityService,
  ) {}

  private async createConfirmEmailOtp(userId: Types.ObjectId) {
    await this.otpRepository.create({
      data: [
        {
          code: createNumericalOtp(),
          expiredAt: new Date(Date.now() + 2 * 60 * 1000),
          createdBy: userId,
          type: OtpEnum.ConfirmEmail,
        },
      ],
    });
  }

  async signup(data: SignupBodyDto): Promise<string> {
    const { username, email, password } = data;
    const checkUser = await this.userRepository.findOne({ filter: { email } });
    if (checkUser) {
      throw new ConflictException('email already exists');
    }
    const [user] = await this.userRepository.create({
      data: [{ username, email, password }],
    });
    if (!user) {
      throw new BadRequestException(
        'Fail to signup this account please try again later',
      );
    }

    await this.createConfirmEmailOtp(user._id);
    return 'Done';
  }

  async resendConfirmEmail(data: ResendConfirmEmailDto): Promise<string> {
    const { email } = data;
    const user = await this.userRepository.findOne({
      filter: { email, confirmedAt: { $exists: false } },
      options: {
        populate: [{ path: 'otp', match: { type: OtpEnum.ConfirmEmail } }],
      },
    });

    console.log({ user });
    if (!user) {
      throw new NotFoundException('Fail to find matching account');
    }

    if (user.otp?.length) {
      throw new ConflictException(
        `Sorry we cannot grant you new OTP until the existing one become expired please try again after: ${user.otp[0].expiredAt}`,
      );
    }
    await this.createConfirmEmailOtp(user._id);
    return 'Done';
  }

  async confirmEmail(data: ConfirmEmailDto): Promise<string> {
    const { email, code } = data;
    const user = await this.userRepository.findOne({
      filter: { email, confirmedAt: { $exists: false } },
      options: {
        populate: [{ path: 'otp', match: { type: OtpEnum.ConfirmEmail } }],
      },
    });

    console.log({ user });
    if (!user) {
      throw new NotFoundException('Fail to find matching account');
    }

    const isMatch =
    user.otp?.length &&
    (await this.securityService.compareHash(code, user.otp[0].code));

  if (!isMatch) {
    throw new BadRequestException('In-valid OTP');
  }

  user.confirmedAt = new Date();
  await user.save();
  await this.otpRepository.deleteOne({filter:{_id:user.otp[0]._id}})
    return 'Done';
  }
}
