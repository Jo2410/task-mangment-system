import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { setDefaultLanguage } from "../../common/middleware/setDefaultLanguage.middleware";


@Module({
    controllers:[UserController],
    exports:[UserService],
    imports:[],
    providers:[UserService],
})

export class UserModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(setDefaultLanguage).forRoutes('user')
    }
}