import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";
import { AdsModule } from './ads/ads.module';
import { MailModule } from './mail/mail.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot("mongodb://LATeam:LATeam12345@ac-uz1vnxm-shard-00-00.tfdgim8.mongodb.net:27017,ac-uz1vnxm-shard-00-01.tfdgim8.mongodb.net:27017,ac-uz1vnxm-shard-00-02.tfdgim8.mongodb.net:27017/FindRoomMate?ssl=true&replicaSet=atlas-mkssn6-shard-0&authSource=admin&retryWrites=true&w=majority"), AdsModule, MailModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
