import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from "@nestjs/mongoose";

import { UserSchema } from "./schema/user.schema";
import {MailModule} from "../mail/mail.module";

@Module({
  imports: [MongooseModule.forFeature([{name: "User", schema: UserSchema}]), MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
