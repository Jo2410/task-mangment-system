import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { AuthenticationController } from "./auth.controller";
import { UserModel } from "../../DB/model/user.model";
import { UserRepository } from "../../DB/repository/user.repository";


@Module({
    imports: [UserModel],
    exports: [AuthenticationService,UserRepository],
    controllers: [AuthenticationController],
    providers: [AuthenticationService,UserRepository],
})




export class AuthenticationModule { }