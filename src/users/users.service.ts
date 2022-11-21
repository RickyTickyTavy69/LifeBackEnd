import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument} from "./schema/user.schema";
import {Model} from "mongoose";

//packages
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel("User")
        private userModel: Model<UserDocument>
    ) {}

    async createUser(body){
        const {password, password2, ...rest} = body;
        if(password !== password2) {
            return {ok: false, message: "your passwords don't match"}
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new this.userModel({...rest, password: hashedPassword, salt});
        try{
            await newUser.save();
            return {ok: true, message: "new user was created"}
        } catch(error){
            return{ ok: false, message: error}
        }


    }

    async getUser(userEmail){
        const user = await this.userModel.findOne({email: userEmail});
        return user;
    }
}
