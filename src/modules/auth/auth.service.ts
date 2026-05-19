import { Injectable } from "@nestjs/common";
import { IUser } from "../../common";






@Injectable()
export class AuthenticationService {
    private users: IUser[] = []
    constructor() { }

    signup(data: any): number {
        //creating the id 
        const id = Date.now()
        this.users.push({ ...data, id })

        return id;
    }

    
    login(){

    }
}



