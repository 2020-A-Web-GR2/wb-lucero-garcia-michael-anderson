import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ComicModule} from "./comic/comic.module";
import {ComicEntity} from "./comic/comic.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    ComicModule,
    TypeOrmModule.forRoot({
      name: 'default',      //nombre de la base de datos
      type: 'mysql',        //tipo de db
      host: 'localhost',    //ip
      port: 3306,           //puerto
      username: 'root',     //usuario
      password: 'root',     //contraseÃ±a
      database: 'examen',     //base de datos
      entities: [           //Todas las entidades
        ComicEntity
      ],
      synchronize: true,    //Actualiza lel esquema de la db
      dropSchema: false,    //Elimida datos y esquema de la vase de datos
    })


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
