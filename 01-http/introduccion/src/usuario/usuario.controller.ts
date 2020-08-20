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
    Body, Req, Res, Put, InternalServerErrorException
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";



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

    constructor(
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
    ) {
    }

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
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try{
            //DEBER
            //VALIDACION CON DTO USUARIO VALIDATOR
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta
        }catch (e) {
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            });
        }
        //const nuevoUsuario = {
        //    id: this.idActual +1,
        //    nombre: parametrosCuerpo.nombre
        //}
        //this.arregloUsuarios.push(nuevoUsuario)
        //this.idActual = this.idActual + 1;
        //return nuevoUsuario;
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
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;
        try {
            console.log('usuarioEditado', usuarioEditado);
            const respuesta = await this._usuarioService
                .editarUno(usuarioEditado);
            return respuesta;
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre;
        // return this.arregloUsuarios[indice];


    }






    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){

        const id = Number(parametrosRuta.id);
        try {
            const respuesta = await this._usuarioService
                .eliminarUno(id);
            return {
                mensaje: 'Registro con id ' + id + ' eliminado'
            };
        } catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje: 'Error del servidor',
            })
        }

        // const indice = this.arregloUsuarios.findIndex(
        //     (usuario) => usuario.id === Number(parametrosRuta.id)
        // )
        // this.arregloUsuarios.splice(indice, 1)
        // return this.arregloUsuarios[indice];

    }


    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //valiar usuario
        //validar mascota

        //- creamos los dos

        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }

    }
    

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Ander';
        res.render(
            'ejemplo', //nombre de la vista (archivo)
        {  // parametros de la vista
            nombre: nombreControlador,
        })
    }

    
    

}