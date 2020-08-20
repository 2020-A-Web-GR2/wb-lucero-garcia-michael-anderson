import {
    IsAlpha,
    IsDateString, IsEmail, IsEmpty, IsInt,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    Length,
    MaxLength
} from "class-validator";

export class usuarioUpdateDto{

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    id:number;

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

    @IsOptional()
    @IsNumber()
    @IsPositive()
    sueldo?: number;

}