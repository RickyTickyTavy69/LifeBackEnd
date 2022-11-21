import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../users/schema/user.schema";

@Module({
  imports: [JwtModule.register({
    secret: "GeheimerGeheimnis",
    signOptions: {
      expiresIn : 3600
    }
  }),
    UsersModule,
  PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
