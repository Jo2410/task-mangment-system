import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { AuthenticationController } from "./auth.controller";
import { UserModel } from "../../DB/model/user.model";
import { UserRepository } from "../../DB/repository/user.repository";
import { OtpRepository } from "../../DB/repository/otp.repository";
import { OtpModel } from "../../DB/model/otp.model";
import { SecurityService } from "../../common/services/security.service";


@Module({
    imports: [UserModel,OtpModel],
    exports: [AuthenticationService],
    controllers: [AuthenticationController],
    providers: [AuthenticationService,UserRepository,OtpRepository,SecurityService],
})




export class AuthenticationModule { }