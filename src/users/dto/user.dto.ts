import {isDefined, IsEmail, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class UserDto{
    @MinLength(4)
    @MaxLength(25)
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @MinLength(8)
    @MaxLength(30)
    @IsString()
    password: string;

    @MinLength(8)
    @MaxLength(30)
    @IsString()
    password2: string;
}