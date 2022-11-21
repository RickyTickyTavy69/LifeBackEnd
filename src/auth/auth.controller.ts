import {Body, Controller, Get, Post, UseGuards, Request, Response} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthDto} from "./dto/auth.dto";
import {AuthGuard} from "@nestjs/passport";

/* The difference between the Authentication and Authorization is that authentication means we check if the
* data sent from client is valid (if the person exist in te DB). Authorization is giving the access to an authenticated
* user to some data which belongs to him or which only he/she should have the access to.
 */

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
                ) {}


    @Post("/login")
    async login(@Body() body: AuthDto, @Response() res){
        const {email, password} = body;
        //console.log("@login email, password", email, password);
        const data = await this.authService.login(email, password)
        console.log("user", data.user);
        console.log("token", data.token);
        if(data.user){
            console.log("user found");
            //res.cookie("accessToken", data.token, {maxAge: 1000 * 60 * 60, httpOnly: true});
            res.status(201).json({message: "user has been logged in", username: data.user.name, token: data.token})
        } else if (!data.user){
            res.status(500).json(data);
        }

    }

    @Post("/logout")
    logout(){

    }

    @Post("/refresh")
    refresh(){

    }

    @Get("/validateToken")
    @UseGuards(AuthGuard())                             // можно написать кастомный guard, а можно импортировать из nestjs/passport
    protected(@Request() req){                          // тут будет находиться username после валидации через Strategy.
        console.log("req", req.user.name)
        return {message: "user has been authenticated", username: req.user.name}
    }
}
