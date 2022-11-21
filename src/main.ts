import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//sessions für den Login
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
      session({
        secret: 'never give up',      // later put it in the env vars.
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 3600000}
      })
  )                                       // когда создаётся сессия для пользователя, генерируется куки с информацией для доступа к store
                // то есть инфа пользователя не послылается на клиент. Только куки с ключом доступа до инфы.
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(5000);
}
bootstrap();
