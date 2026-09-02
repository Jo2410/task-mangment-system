import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { AuthenticationController } from "./auth.controller";
import { UserModel } from "../../DB/model/user.model";


@Module({
    imports: [UserModel],
    exports: [AuthenticationService],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})




export class AuthenticationModule { }