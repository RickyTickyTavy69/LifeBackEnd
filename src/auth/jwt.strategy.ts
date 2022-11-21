import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt"
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtPayLoad} from "./jwt-payload.interface";
import {InjectModel} from "@nestjs/mongoose";
import {UserDocument} from "../users/schema/user.schema";
import {Model} from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel("User")
        private userModel: Model<UserDocument>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "GeheimerGeheimnis",
        });
    }
                                                                    // здесь payload уже верифицирован.
    async validate(payload: JwtPayLoad){                            // Получается, этот метод validate автоматически кладёт то, что он
        const user = await this.userModel.findOne({name: payload.username});      // Возвращает в объект req. (но только если настроить Guard?)
        if(!user){
            throw new UnauthorizedException();     // а куда попадает эта exception?
        }
        return user;
    }
}