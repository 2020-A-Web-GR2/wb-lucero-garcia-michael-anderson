import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class MascotaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}