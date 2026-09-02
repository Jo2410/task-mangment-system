import { ConflictException, Injectable } from '@nestjs/common';
import { IUser } from '../../common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../DB/model/user.model';
import { Model } from 'mongoose';
import { SignupBodyDto } from './dto/signup.dto';

@Injectable()
export class AuthenticationService {
  private users: IUser[] = [];
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async signup(data: SignupBodyDto): Promise<string> {
    const {username, email ,password } = data;
    const checkUser = await this.model.findOne({ email: data.email});
    if (checkUser) {
        throw new ConflictException ("email already exists");
    }
    const [user] = await this.model.create([{ username, email, password }]);

    return 'Done';
  }

  login() {}
}
