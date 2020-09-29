import {
    IsEmpty,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength
} from "class-validator";


export class ComicCreateDto{
    @IsEmpty()
    id?:number;

    @IsNotEmpty()
    @MaxLength(60)
    titulo:string;

    @IsNotEmpty()
    @MaxLength(60)
    autor:string;

    @IsNumber()
    @IsPositive()
    precio?:number

    @IsNotEmpty()
    @MaxLength(60)
    categoria:string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    edicion?:number;

}