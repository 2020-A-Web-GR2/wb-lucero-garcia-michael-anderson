import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param, Post,
    Query,
    Res,
    Session, ValidationError
} from "@nestjs/common";
import {ComicService} from "./comic.service";
import {ComicUpdateDto} from "./dto/comic.update.dto";
import validate = WebAssembly.validate;
import {ComicEntity} from "./comic.entity";

@Controller('/comic')

export class ComicController{

    constructor(
        private readonly _ComicService: ComicService
    ){}

    @Get()
    async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session,
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._ComicService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando comics')
        }
        if (resultadoEncontrado) {
            res.render(
                'home',
                {
                    usuario: session.usuario,
                    arregloComics: resultadoEncontrado,
                    mensaje: parametrosConsulta.mensaje
                });
        } else {
            throw new NotFoundException('No se encontraron comics')
        }
    }

    @Get('/crear')
    vistaCrear(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session,
    ){
        res.render(
            'crearComic',
            {

                usuario: session.usuario,
                error: parametrosConsulta.error,

                titulo: parametrosConsulta.titulo,
                autor: parametrosConsulta.autor,
                precio: parametrosConsulta.precio,
                categoria: parametrosConsulta.categoria,
                edicion: parametrosConsulta.edicion

            }
        )
    }

    @Get('editar/:id')
    async vistaEditar(
        @Res() res,
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Session() session,
    ){
        const id = Number(parametrosRuta.id);
        let comicEncontrado;
        try {
            comicEncontrado= await this._ComicService.buscarUno(id)
            if(comicEncontrado) {
                return res.render(
                    'crearComic',
                    {
                        usuario: session.usuario,
                        error: parametrosConsulta.error,
                        comic: comicEncontrado
                    }
                )
            }else{
                return res.redirect('../comic?mensaje=Comic no encontrado')
            }
        } catch (e) {
            console.error('Error del servidor')
            return res.redirect('../comic?mensaje=Error busacando comic')
        }

    }

    @Post('/editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const comic = new ComicUpdateDto();
        
        comic.titulo = parametrosCuerpo.titulo;
        comic.autor = parametrosCuerpo.autor;
        comic.precio = parametrosCuerpo.precio;
        comic.categoria = parametrosCuerpo.categoria;
        comic.edicion = parametrosCuerpo.edicion
        
        let errores: ValidationError[]
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            errores = await validate(comic);
            const mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('editar/' + parametrosRuta.id + '?error=Error validadndo datos');
        }
        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('editar/' + parametrosRuta.id + '?error=Error en los datos');
        }else {
            const comicEditado = {
                id: Number(parametrosRuta.id),
                titulo: parametrosCuerpo.titulo,
                autor: parametrosCuerpo.autor,
                precio: Number(parametrosCuerpo.precio),
                categoria: parametrosCuerpo.categoria,
                edicion: Number(parametrosCuerpo.edicion)
                
            } as ComicEntity;
            try {
                await this._ComicService.editarUno(comicEditado);
                return res.redirect('/comic?mensaje=Comic Editado');
            } catch (error) {
                console.error(error);
                return res.redirect('editar/' + parametrosRuta.id + '?error=Error al editar comic');
            }
        }
    }

    @Post("/crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const comic = new ComicUpdateDto();

        comic.titulo = parametrosCuerpo.titulo;
        comic.autor = parametrosCuerpo.autor;
        comic.precio = parametrosCuerpo.precio;
        comic.categoria = parametrosCuerpo.categoria;
        comic.edicion = parametrosCuerpo.edicion

        const comicConsulta = `&titulo=${parametrosCuerpo.titulo}&autor=${parametrosCuerpo.autor}&precio=${parametrosCuerpo.precio}&categoria=${parametrosCuerpo.categoria}&edicion=${parametrosCuerpo.edicion}`
        let errores: ValidationError[]
        try{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            errores = await validate(comic);
            const mensaje = '';
        }catch (e) {
            console.error(e)
            return res.redirect('crear?error=Error validadndo datos' + comicConsulta);
        }

        if (errores.length > 0) {
            console.error('Error', errores);
            return res.redirect('crear?error=Error en los datos' + comicConsulta);
        }else{
            let respuestaCreacionUsuario
            try{
                respuestaCreacionUsuario = await this._ComicService.crearUno(parametrosCuerpo)
            } catch (error) {
                console.log(error);
                return res.redirect('crear?error=Error creando comic' + comicConsulta);
            }
            if(respuestaCreacionUsuario){
                return res.redirect('../comic?mensaje=Comic creado')
            } else {
                return res.redirect('crear?error=Error creando comic' + comicConsulta);
            }
        }
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._ComicService.eliminarUno(id);
            return res.redirect('/comic?mensaje=Comic eliminado');
        } catch (error) {
            console.log(error);
            return res.redirect('/comic?error=Error eliminando comic');
        }

    }

}