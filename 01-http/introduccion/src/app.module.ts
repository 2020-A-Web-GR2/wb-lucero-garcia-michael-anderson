import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from './http/http-juego.module';
import {UsuarioModule} from './usuario/usuario.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsuarioEntity} from './usuario/usuario.entity';
import {HttpCalculatorModule} from "./http/Deber01/http-calculator.module";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";



@Module({
  imports: [
      UsuarioModule,
      MascotaModule,
      VacunaModule,


      TypeOrmModule

          .forRoot({
              name: 'default', //nombre de conexion
              type: 'mysql',  //mysql postgres
              host: '127.0.0.1', //id
              port: 3306, //puerto
              username: 'root', //usuario
              password: 'anderson', //password
              database: 'test', //base de datos
              entities: [ //todas las entidades
                UsuarioEntity,
                  VacunaEntity,
                  MascotaEntity
          ],
          synchronize: true, //actualiza el esquema de la base de datos
          dropSchema: false //elimina datos y el esquema de base de datos
      }),

  ],
  controllers: [
      AppController
  ],
  providers: [
      AppService
  ],
})
export class AppModule {}
