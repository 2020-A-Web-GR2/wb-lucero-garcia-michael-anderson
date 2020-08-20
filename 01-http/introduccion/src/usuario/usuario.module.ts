import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MascotaModule} from "../mascota/mascota.module";


//@nombre() ----> decorador

@Module({
    imports:[
        MascotaModule,
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'default' // Nombre cadena de conexion
        )
    ],
    controllers:[
        UsuarioController
    ],
    providers:[
        UsuarioService
    ]
})
export class UsuarioModule{

}