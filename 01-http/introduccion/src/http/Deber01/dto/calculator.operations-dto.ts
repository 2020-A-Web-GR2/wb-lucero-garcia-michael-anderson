import {IsNotEmpty, IsNumber} from "class-validator";

export class CalculatorOperationsDto{
    @IsNotEmpty()
    @IsNumber()
    number1:Number

    @IsNumber()
    @IsNotEmpty()
    number2:Number
}