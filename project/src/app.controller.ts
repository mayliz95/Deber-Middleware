import {Get, Controller, Res, Req} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Get('archivo')
  guardarEnArchivo() {
      return 'Revise archivo';
  }

  @Get('consola')
  imprimirEnConsola() {
      return 'Revise consola';
  }

  @Get('todo')
  todo() {
      return 'Revise archivo y Revise consola';
  }

  @Get('prueba')
  cookieprueba(
      @Req() request,
      @Res() response,
  ) {
      const nombreCookie = 'RegistroC';
      const existeCookie = request.cookies[nombreCookie];

      if (existeCookie) {
          return response.send(existeCookie);
      } else {
          return response
                  .status(400)
                  .send({mensaje: 'No existe cookie', status: 400})
      }
      //return 'Prueba Cookie';
  }

  @Get('anadirCookie')
  anadirCookie(
      @Res() response,
      @Req() request,
      ) {
      const parametros = {
          nombre: request.query.nombre,
          valor: request.query.valor
      };
      response.cookie(parametros.nombre, parametros.valor);
      return response.send();
  }

  @Get('buscarCookie/:nombreCookie')
  buscarCookie(
      @Req() request,
      @Res() response,
      ) {
      const nombreCookie = request.params.nombreCookie;
      //const existeCookie = request.cookie;
      const existeCookie = request.cookies[nombreCookie];
      console.log(existeCookie);

      if (existeCookie) {
          return response.send(existeCookie);
      } else {
          return response
              .status(400)
              .send({mensaje: 'No existe cookie', status: 400})
      }
  }
}
