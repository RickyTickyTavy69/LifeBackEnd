import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {JwtPayLoad} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(email, password){
        const user = await this.usersService.getUser(email);
        if(!user.verified){
            return{message: "your account is not verified. Check out your email box", username: user.name, verified: false}
        }
        if(!user) {
            return {message: "invalid authorization data", username: null}
        }
        console.log("passwords", user.password, password);
        //const isMatch = await bcrypt.compare(password, user.password);
        console.log("password. salt", password, user.salt);
        const hashedpassword = await bcrypt.hash(password, user.salt);
        const isMatch = (user.password === hashedpassword);
        console.log("isMatch", isMatch);
        if(!isMatch){
            return {message: "invalid authorization data", username: null}
        }
        const payload: JwtPayLoad = {username: user.name}
        const accessToken = this.jwtService.sign(payload)
        return {message: "user has been validated", user, token: accessToken};         // А ТУТ Я ЕГО ПРОВАЛИДИРОВАЛ
    }

    logout(){

    }

    refresh(){

    }
}
