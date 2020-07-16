import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar cosas en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Aqui configuracion antes del app.listen()
  //await app.listen(3000)

  app.use(cookieParser())
  await app.listen(3001);
}
bootstrap();
