import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()

export class VacunaEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

}