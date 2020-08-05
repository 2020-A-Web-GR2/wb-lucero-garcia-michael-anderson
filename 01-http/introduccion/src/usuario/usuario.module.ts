import {Module} from '@nestjs/common'
import {UsuarioController} from "./usuario.controller";
import {UsuarioEntity} from "./usuario.entity";
import {TypeOrmModule} from "@nestjs/typeorm";


//@nombre() ----> decorador

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                UsuarioEntity
            ],
            'andertaker' // Nombre cadena de conexion
        )
    ],
    controllers:[
        UsuarioController
    ],
    providers:[

    ],
})
export class UsuarioModule{

}