import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('comic')

export class ComicEntity{
    @PrimaryGeneratedColumn({
        name:'idComic'
    })
    id:number

    @Column({
        name:'tituloComic',
        type: 'varchar',
        length:'50',
        nullable:false
    })
    titulo:string

    @Column({
        name:'autorComic',
        type: 'varchar',
        length:'50',
        nullable:false
    })
    autor:string

    @Column({
        name:'precioComic',
        type: 'double',
        nullable:true
    })
    precio?:number

    @Column({
        name:'categoriaComic',
        type: 'varchar',
        length:'50',
        nullable:false
    })
    categoria:string

    @Column({
        name:'edicionComic',
        type: 'int',
        nullable:true
    })
    edicion?:number

}