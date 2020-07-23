import {Module} from '@nestjs/common'
import {UsuarioController} from "./usuario.controller";


//@nombre() ----> decorador

@Module({
    imports:[

    ],
    controllers:[
        UsuarioController
    ],
    providers:[

    ],
})
export class UsuarioModule{

}