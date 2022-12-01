import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//sessions für den Login
import * as passport from "passport";

//dotenv
import dotenv from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(passport.initialize());
  //app.use(passport.session());

  await app.listen(5000);
}
bootstrap();
