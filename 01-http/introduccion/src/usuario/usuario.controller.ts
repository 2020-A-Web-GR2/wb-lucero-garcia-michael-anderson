import {
    Controller,
    Get,
    Post,
    Delete,
    HttpCode,
    Header,
    BadRequestException,
    Param,
    Query,
    Body, Req, Res, Put
} from "@nestjs/common";


@Controller('usuario-http')

export class UsuarioController{

    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Ander'
        },
        {
            id: 2,
            nombre: 'Michael'
        },
        {
            id: 3,
            nombre: 'Amelia'
        }
    ]

    public idActual = 3;

@Get()
    mostrarTodos(){
        return this.arregloUsuarios;
    }

    //XML <usuario><nombre>ANDER<nombre/><usuario/>

    //JSON {"nombre":"ANDER"}

    //RESTful - JSON

    // http://localhost:3001/
    //RESTFUL MASCOTA

    // ver todos
    // GET http://localhost:3001/mascota
    // ver uno
    // GET http://localhost:3001/mascota/1
    // crear uno
    // POST http://localhost:3001/mascota/ (BODY)
    // editar uno
    // PUT http://localhost:3001/mascota/1 (BODY)
    // eliminar uno
    // DELETE http://localhost:3001/mascota/1

    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ){
        const nuevoUsuario = {
            id: this.idActual +1,
            nombre: parametrosCuerpo.nombre
        }
        this.arregloUsuarios.push(nuevoUsuario)
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }


    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
    const indice = this.arregloUsuarios.findIndex(
        (usuario) => usuario.id === Number(parametrosRuta.id)
    )
        return this.arregloUsuarios[indice];
    }


    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        return this.arregloUsuarios[indice];
    }

    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta,
    ){
        const indice = this.arregloUsuarios.findIndex(
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice, 1)
        return this.arregloUsuarios[indice];
    }

}