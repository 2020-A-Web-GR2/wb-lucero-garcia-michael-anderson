import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res
} from "@nestjs/common";
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
                    'puntos', // nombre
                    100, // valor
                    {signed: true}
                );
                res.cookie(
                    'username', // nombre
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
        @Query() parametrosDeConsulta,
        @Req() req,
        @Res() res
    ) {

        const userName = req.cookies.username;
        var puntos = req.signedCookies.puntos;
        const suma = new CalculatorOperationsDto();
        suma.number1 = Number(parametrosDeConsulta.number1);
        suma.number2 = Number(parametrosDeConsulta.number2);

        if(userName !== undefined){
            try {
                const errores: ValidationError[] = await validate(suma);
                var texto = '';
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error to validate1');
                } else {
                    var sumatotal = Number(parametrosDeConsulta.number1) + Number(parametrosDeConsulta.number2);
                    puntos -= Math.abs(sumatotal);

                    if(puntos <= 0){
                        texto += ' y usted ya a consumido todos sus puntos, ahora se restableceran sus puntos a 100';
                        puntos=100;
                    }else{
                        texto += ' y usted tiene ' + puntos + ' puntos';
                    }
                    res.cookie(
                        'puntos',
                        puntos,
                        {signed: true}
                    )
                    res.send({
                        message: "la suma de los dos numeros es: " + sumatotal + ' ' + texto
                    })
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error to validate.');
            }
        }else {
            res.send({
                message: 'no hay usuarios.'
            });
        }
    }



    @Put('restar')
    @HttpCode(201)
    async consultaresta(
        @Body() parametrosDeCuerpo,
        @Res() res,
        @Req() req
    ) {

        const userName = req.cookies.username;
        var puntos = req.signedCookies.puntos;
        const resta = new CalculatorOperationsDto();
        resta.number1 = Number(parametrosDeCuerpo.number1);
        resta.number2 = Number(parametrosDeCuerpo.number2);

        if(userName !== undefined) {
            try {
                const errores: ValidationError[] = await validate(resta);
                var texto = '';
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error to validate1');
                } else {
                    var restatotal = Number(parametrosDeCuerpo.number1) - Number(parametrosDeCuerpo.number2);
                    puntos -= Math.abs(restatotal);

                    if(puntos <= 0){
                        texto += ' y usted ya a consumido todos sus puntos, ahora se restableceran sus puntos a 100';
                        puntos=100;
                    }else{
                        texto += ' y usted tiene ' + puntos + ' puntos';
                    }
                    res.cookie(
                        'puntos',
                        puntos,
                        {signed: true}
                    )
                    res.send({
                        message: "la resta de los dos numeros es: " + restatotal + ' ' + texto
                    })

                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error to validate.');
            }
        }else {
            res.send({
                message: 'no hay usuarios.'
            });
        }
    }

    @Delete('multiplicar')
    @HttpCode(200)
    async multiplicar(
        @Req() req,
        @Res() res
    ) {

        const userName = req.cookies.username;
        var puntos = req.signedCookies.puntos;
        const multiplicar = new CalculatorOperationsDto();
        multiplicar.number1 = Number(req.headers.number1);
        multiplicar.number2 = Number(req.headers.number2);

        if(userName !== undefined){
            try {
                const errores: ValidationError[] = await validate(multiplicar);
                var texto = '';
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error to validate1');
                } else {
                    var multiplicaciontotal = Number(multiplicar.number1) * Number(multiplicar.number2);
                    puntos -= Math.abs(multiplicaciontotal);

                    if(puntos <= 0){
                        texto += ' y usted ya a consumido todos sus puntos, ahora se restableceran sus puntos a 100';
                        puntos=100;
                    }else{
                        texto += ' y usted tiene ' + puntos + ' puntos';
                    }
                    res.cookie(
                        'puntos',
                        puntos,
                        {signed: true}
                    )
                    res.send({
                        message: "la multiplicacion de los dos numeros es: " + multiplicaciontotal + ' ' + texto
                    })
                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error to validate.');
            }
        }else {
            res.send({
                message: 'no hay usuarios.'
            });
        }
    }


    @Post('/dividir/:number1/:number2')
    @HttpCode(201)
    async parametrosRuta(
        @Param() parametrosRuta,
        @Res() res,
        @Req() req

    ) {
        const userName = req.cookies.username;
        var puntos = req.signedCookies.puntos;
        const division = new CalculatorOperationsDto();
        division.number1 = Number(parametrosRuta.number1);
        division.number2 = Number(parametrosRuta.number2);

        if(userName !== undefined) {
            try {
                const errores: ValidationError[] = await validate(division);
                var texto = '';
                if (errores.length > 0) {
                    console.error('Errores: ', errores);
                    throw new BadRequestException('Error to validate1');
                } else {

                    if (Number(parametrosRuta.number2 != 0)) {
                        var divisiontotal = Number(parametrosRuta.number1) / Number(parametrosRuta.number2);
                        puntos -= Math.abs(divisiontotal);
                        texto += "la division de los dos numeros es: " + divisiontotal;
                    } else {
                        texto +=  "No es posible dividir un numero para cero"
                    }

                    if(puntos <= 0){
                        texto += ' y usted ya a consumido todos sus puntos, ahora se restableceran sus puntos a 100';
                        puntos=100;
                    }else{
                        texto += ' y usted tiene ' + puntos + ' puntos';
                    }
                    res.cookie(
                        'puntos',
                        puntos,
                        {signed: true}
                    )
                    res.send({
                        message: texto
                    })

                }
            } catch (e) {
                console.error('Error', e);
                throw new BadRequestException('Error to validate.');
            }
        }else {
            res.send({
                message: 'no hay usuarios.'
            });
        }
    }

    @Get('/mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

}
