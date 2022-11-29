import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {MailService} from "../mail/mail.service";
import {UserDocument} from "./schema/user.schema";
import {Model} from "mongoose";

//packages
import * as bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";


@Injectable()
export class UsersService {

    constructor(
        @InjectModel("User")
        private userModel: Model<UserDocument>,
        private mailService: MailService
    ) {}

    async createUser(body){
        const {password, password2, ...rest} = body;
        if(password !== password2) {
            return {ok: false, message: "your passwords don't match"}
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newSecretString = uuidV4();
        const newSecretCode = newSecretString.slice(0, 8);
        const hashedSecretCode = await bcrypt.hash(newSecretCode, salt);
        const newUser = new this.userModel({...rest, password: hashedPassword, salt, verified: false, code: hashedSecretCode});
        try{
            await newUser.save();
            console.log("secret code", newSecretCode);
            await this.mailService.sendVerificationEmail(body.name, body.email, newSecretCode);
            return {ok: true, message: "new user was created", username: body.name};
        } catch(error){
            return{ ok: false, message: error}
        }
    }

    async verifyUser(code, username){
        const user = await this.userModel.findOne({name: username});
        console.log("username", username);
        const hashedCode = await bcrypt.hash(code, user.salt);
        const isCodeValid = (user.code === hashedCode);

        if(!isCodeValid){
            return {message: "invalid code", validate: false, username}
        } else if(isCodeValid){
            const result = await this.userModel.findOneAndUpdate({name: username}, {verified: true});
            return {message: "user verified", validate: true, username}
        }
    }

    async getUser(userEmail){
        const user = await this.userModel.findOne({email: userEmail});
        return user;
    }
}
