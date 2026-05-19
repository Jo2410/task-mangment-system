import { Module } from "@nestjs/common";
import { AuthenticationService } from "./auth.service";
import { AuthenticationController } from "./auth.controller";


@Module({
    imports: [],
    exports: [AuthenticationService],
    controllers: [AuthenticationController],
    providers: [AuthenticationService],
})




export class AuthenticationModule { }