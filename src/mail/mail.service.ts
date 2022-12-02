import { Injectable } from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

// dotenv
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendVerificationEmail(name, email, code){

        const url = `"http://192.168.2.164:5000/auth/confirm?name=${name}"`;

        console.log("sending the email to", name, email);

        try{
            await this.mailerService.sendMail({
                to: email,
                subject: "pls confirm your email now do it fast",
                template: "verification",
                context: {
                    name: name,
                    code,
                }
            })
        } catch(error){
            console.log("error sending email", error);
        }

    }
}
