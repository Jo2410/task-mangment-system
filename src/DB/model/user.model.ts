import { MongooseModule, Prop, Schema, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { GenderEnum, ProviderEnum } from '../../common/enum/user.enum';
import { HydratedDocument } from 'mongoose';

@Schema({
  strictQuery: true,
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})
export class User {
  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 53,
    trim: true,
  })
  firstName!: string;

  @Prop({
    type: String,
    required: true,
    minlength: 2,
    maxlength: 53,
    trim: true,
  })
  lastName!: string;

  @Virtual({
    get: function (this: User) {
      return this.firstName + ' ' + this.lastName;
    },
    set: function (value: string) {
      const [firstName, lastName] = value.split(' ');
      Object.assign(this, { firstName, lastName });
    },
  })
  username!: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email!: string;

  @Prop({ type: Date, required: false })
  confirmEmail?: Date;

  @Prop({
    type: String,
    required: function (this: User) {
      return this.provider === ProviderEnum.GOOGLE ? false : true;
    },
  })
  password!: string;

  @Prop({
    type: String,
    enum: ProviderEnum,
    required: true,
    default: ProviderEnum.SYSTEM,
  })
  provider!: ProviderEnum;

  @Prop({
    type: String,
    enum: GenderEnum,
    required: true,
    default: GenderEnum.male,
  })
  gender!: GenderEnum;

  @Prop({
    type: Date,
    required: false,
  })
  changeCredentialsTime?: Date;
}

// Create the Mongoose schema for the User class
// The schema will be used to define the structure of the User documents in the MongoDB collection
const userSchema = SchemaFactory.createForClass(User);
// Export the User schema to be used in other parts of the application
// for auth.service.ts constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>);
export type UserDocument = HydratedDocument<User>;
// Export the User model to be used in other parts of the application
// for auth.module.ts
//registers the User model with NestJS's dependency injection system
export const UserModel = MongooseModule.forFeature([{name: User.name, schema: userSchema}]);
