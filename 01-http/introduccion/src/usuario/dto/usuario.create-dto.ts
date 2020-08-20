import {
    IsAlpha,
    IsDateString, IsEmpty,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    Length,
    MaxLength
} from "class-validator";

export class usuarioCreateDto{

    @IsEmpty()
    id?:number;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MaxLength(50)
    nombre?: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MaxLength(50)
    apellido?: string;

    @IsNotEmpty()
    @IsNumberString()
    @Length(10)
    cedula?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    sueldo?: number;

    @IsOptional()
    @IsDateString()
    fechaNacimiento?:string;

    @IsOptional()
    @IsDateString()
    fechaHoraNacimiento?:string;

}