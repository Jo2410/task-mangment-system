import { Injectable } from "@nestjs/common";
import { UserDocument as TDocument, User } from "../model/user.model";
import { DatabaseRepository } from "./database.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository extends DatabaseRepository<User> {
    constructor(@InjectModel(User.name) protected readonly model: Model<TDocument>) {
        super(model);
    }
}