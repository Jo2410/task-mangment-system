import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from './database.repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Otp } from '../model/otp.model';
import { OtpDocument as TDocument } from '../model/otp.model';

@Injectable()
export class OtpRepository extends DatabaseRepository<Otp> {
  constructor(
    @InjectModel(Otp.name) protected readonly model: Model<TDocument>,
  ) {
    super(model);
  }
}
