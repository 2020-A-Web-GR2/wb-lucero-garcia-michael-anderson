import {Controller, Get, Post, Delete, HttpCode, Header, BadRequestException, Param, Query, Body} from "@nestjs/common";

// http://localhost:3001/juegos-http
// @Controller('')

@Controller('juegos-http')

export class HttpJuegoController{

    @Get('hola')
    @HttpCode(201)
    public holaget(){

        throw new BadRequestException('No envia nada')

        // return 'Hola get xD'
    }

    @Post('hola')
    @HttpCode(202)
    public holapost(){
        return 'Hola post xD'
    }

    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-Control','none')
    @Header('EPN','probando cosas')
    public holadelete(){
        return 'Hola delete xD'
    }

    //http:localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ){
        console.log('Parametros',parametrosRuta);
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);

        if(isNaN(parametrosRuta.edad) == false && isNaN(parametrosRuta.altura) == false){
            return edad + altura;
        }else{
            throw new BadRequestException('no ingreso numeros')
        }

    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ){

        console.log('parametrosDeConsulta',parametrosDeConsulta)

        const nombre = String(parametrosDeConsulta.nombre)
        const apellido = String(parametrosDeConsulta.apellido)

        if(parametrosDeConsulta.nombre && parametrosDeConsulta.apellido){

            return parametrosDeConsulta.nombre +' '+ parametrosDeConsulta.apellido;
        }else{
            return ':)';
        }

    }


    @Post('parametros-cuerpo')
    parametrosCuerpo(
        @Body() parametrosDeCuertpo
    ){
        console.log('parametrosDeCuerpo',parametrosDeCuertpo)
        return 'registro creado';
    }





}