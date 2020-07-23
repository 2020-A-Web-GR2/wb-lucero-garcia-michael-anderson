import {BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, Query, Req, Res} from "@nestjs/common";
import {validate, ValidationError} from "class-validator";
import {NameSaveDto} from "./dto/name.save-dto";
import {CalculatorOperationsDto} from "./dto/calculator.operations-dto";

@Controller('calculator-http')

export class HttpCalculatorController{


    @Get('save-user-name')
    async guardarCookieInsegura(
        @Query() parametrosconsulta,
        @Res() res
    ) {
        const userName = new NameSaveDto();
        userName.name = parametrosconsulta.name;
        console.log('parametrosconsulta',userName)
        try {
            const errores: ValidationError[] = await validate(userName);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error to validate');
            } else {
                res.cookie(
                    'user-name', // nombre
                    userName.name, // valor
                );
                const mensaje = {
                    mensaje: 'correct user'
                };
                res.send(mensaje);
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error to validate.');
        }
    }



    @Get('sumar')
    @HttpCode(200)
    async parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {

        const suma = new CalculatorOperationsDto();
        suma.number1 = Number(parametrosDeConsulta.number1);
        suma.number2 = Number(parametrosDeConsulta.number2);

        try {
            const errores: ValidationError[] = await validate(suma);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error to validate1');
            } else {
                var sumatotal = Number(parametrosDeConsulta.number1) + Number(parametrosDeConsulta.number2);
                return "la suma de los dos numeros es: " + sumatotal ;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error to validate.');
        }
    }



    @Put('restar')
    @HttpCode(201)
    async consultaresta(
        @Body() parametrosDeCuerpo
    ) {
        const suma = new CalculatorOperationsDto();
        suma.number1 = Number(parametrosDeCuerpo.number1);
        suma.number2 = Number(parametrosDeCuerpo.number2);
        try {
            const errores: ValidationError[] = await validate(suma);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error to validate1');
            } else {
                var sumatotal = Number(parametrosDeCuerpo.number1) - Number(parametrosDeCuerpo.number2);
                return "la resta de los dos numeros es: " + sumatotal ;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error to validate.');
        }
    }

    @Post('/dividir/:number1/:number2')
    async parametrosRuta(
        @Param() parametrosRuta
    ) {
        const suma = new CalculatorOperationsDto();
        suma.number1 = Number(parametrosRuta.number1);
        suma.number2 = Number(parametrosRuta.number2);

        try {
            const errores: ValidationError[] = await validate(suma);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error to validate1');
            } else {
                if (Number(parametrosRuta.number2 != 0)) {
                    var sumatotal = Number(parametrosRuta.number1) / Number(parametrosRuta.number2);
                    return "la division de los dos numeros es: " + sumatotal;
                } else {
                    return "No es posible dividir un numero para cero"
                }
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error to validate.');
        }

    }

}
