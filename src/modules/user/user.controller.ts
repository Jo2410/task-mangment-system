import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { IUser } from "../../common";




@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService){}

    @Get()
    allusers():{message:string,data:{users:IUser[]}}{

        const users:IUser[]=this.userService.allusers()

        return {message:"Done",data:{users}}
    }

}