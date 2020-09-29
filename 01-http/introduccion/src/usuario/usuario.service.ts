import {Injectable} from "@nestjs/common";
import {FindManyOptions, Like, Repository} from "typeorm";
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

    buscarTodos(textoDeConsulta?:String){
        if (textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        nombre: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        apellido: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        cedula: Like(`%${textoDeConsulta}%`)
                    }
                ]
            }
            return this.repositorio.find(consulta);
        } else{
            return this.repositorio.find();
        }
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