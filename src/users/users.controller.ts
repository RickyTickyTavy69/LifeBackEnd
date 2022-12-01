import { Body, Controller, Post } from '@nestjs/common';
import {UsersService} from "./users.service";
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Post()
    async createUser(@Body() body : UserDto){
        console.log("@ usersController", body);
        const result = await this.userService.createUser(body);
        return result;
    }

    @Post("validate")
    async validateUser(@Body() body){
        console.log("validating code", body);
        const {code, username} = body;
        const result = await this.userService.verifyUser(code, username);
        return result;
    }

}
