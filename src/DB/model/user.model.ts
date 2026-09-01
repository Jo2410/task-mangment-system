import { Prop, Schema, Virtual } from '@nestjs/mongoose';
import { GenderEnum,ProviderEnum } from '../../common/enum/user.enum';

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

    @Prop({type:Date,required:false})
  confirmEmail? :Date;

    @Prop({
        type : String,
        required : function(this : User)   {
            return this.provider === ProviderEnum.GOOGLE ? false : true;
        }
    })
  password!: string;

  
    @Prop({
      type: String,
      enum: ProviderEnum,
      required: true,
      default : ProviderEnum.SYSTEM
    })
  provider!: ProviderEnum;


  @Prop({
    type: String,
    enum: GenderEnum,
    required: true,
    default : GenderEnum.male
  })
  gender!: GenderEnum;

  @Prop({
    type: Date,
    required: false,
  })
  changeCredentialsTime?:Date;



}
