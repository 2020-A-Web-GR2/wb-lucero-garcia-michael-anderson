import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

// Controlador
// Servicio
// Modulo
// Importar servicio controlador en el modulo
// Importar modulo en el modulo principal

@Injectable()
export class UsuarioService{


    constructor( // inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>
    ) {


    }
    crearUno(nuevoUsiario: UsuarioEntity){
        return this.repositorio.save(nuevoUsiario)
    }

    buscarTodos() {
        return this.repositorio.find() // promesa
    }

    buscarUno(id: number) {
        return this.repositorio.findOne(id) // promesa
    }

    editarUno(usuarioEditado: UsuarioEntity) {
        return this.repositorio.save(usuarioEditado);
    }

    eliminarUno(id: number) {
        return this.repositorio.delete(id);
    }
    
}