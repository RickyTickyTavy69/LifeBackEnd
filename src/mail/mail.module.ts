import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

//path
import * as path from "path";

@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user:'bakirovartem69@gmail.com',
        pass:'dznjgkqvndppztrg',
      },
    },
    defaults: {
      from: '"Verify your email" <roommateSearchVerify@noreply.com>'
    },
    template: {
      dir: path.join(__dirname, "templates"),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      }
    }
  })],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
