import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {options} from "tsconfig-paths/lib/options";
import {MascotaEntity} from "../mascota/mascota.entity";

@Index([

    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' //nombres de las propiedades en la clase

])

//indice compuesto

//@Index([
//    'nombre','apellido','cedula'
//],{
//   unique: true
//})



@Entity('db_usuario') //nombre de la tabla usuario
export class UsuarioEntity{

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    cedula: string


    @Column({
        nullable: true,
        type: "decimal",
        precision: 10,
        scale: 4
    })
    sueldo?:number


    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_nacimiento_nacimiento'
    })
    fechaHoraNacimiento?: string;


    // Usuario Entity
    @OneToMany(
        type => MascotaEntity,
        // Que entidad nos relacionamos
        mascota => mascota.usuario
        // Campo con el q relacionamos
    )
    mascotas: MascotaEntity[];



}