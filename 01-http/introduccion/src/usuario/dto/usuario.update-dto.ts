import {
    IsAlpha,
    IsDateString, IsEmail,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsOptional, IsPositive,
    IsString,
    Length,
    MaxLength
} from "class-validator";

export class usuarioUpdateDto{

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