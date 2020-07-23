import {IsNotEmpty, IsString} from "class-validator";

export class NameSaveDto {
    @IsNotEmpty()
    @IsString()
    name:String;
}