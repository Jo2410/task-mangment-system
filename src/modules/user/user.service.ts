import { Injectable } from "@nestjs/common";
import { IUser } from "src/common";








@Injectable()
export class UserService{
    constructor(){}

    allusers():IUser[]{
        return [{id:2,email:'sdfs',password:'sfs',username:'ss'}]
    }
}