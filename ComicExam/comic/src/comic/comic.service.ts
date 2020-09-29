import {ComicEntity} from "./comic.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Like, Repository} from "typeorm";

export class ComicService{
    constructor(
        @InjectRepository(ComicEntity)
        private repositorio: Repository<ComicEntity>
    ) {
    }

    crearUno(empresa: ComicEntity){
        return this.repositorio.save(empresa);
    }

    buscarTodos(textoDeConsulta?:String){
        if (textoDeConsulta !== undefined) {
            const consulta: FindManyOptions<ComicEntity> = {
                where: [
                    {
                        nombre: Like(`%${textoDeConsulta}%`)
                    },
                    {
                        ciudad: Like(`%${textoDeConsulta}%`)
                    }
                ]
            }
            return this.repositorio.find(consulta);
        } else{
            return this.repositorio.find();
        }
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id);
    }

    editarUno(empresa: ComicEntity){
        return this.repositorio.save(empresa);
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id);
    }

}