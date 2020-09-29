import {Body, Controller, Get, Post, Req, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
  login(
      @Res() response,
  )  {
    return response.render('login/login')
  }

  @Post('login')
  loginPost(
      @Body() parametrosConsulta,
      @Res() response,
      @Session() session
  ) {
    // validamos datos
    const usuario = parametrosConsulta.usuario;
    const password = parametrosConsulta.password;
    if (usuario == 'Adrian' && password == '1234') {
      session.usuario = usuario
      return response.redirect('/comic');
    } else {
      return response.redirect('/login');
    }
  }

  @Get('logout')
  logout(
      @Session() session,
      @Res() response,
      @Req() request
  ){
    session.username = undefined;
    request.session.destroy();
    return response.redirect('login')
  }


}
