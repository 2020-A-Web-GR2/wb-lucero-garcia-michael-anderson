import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


//@nombre() ----> decorador

@Module({
    imports:[
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