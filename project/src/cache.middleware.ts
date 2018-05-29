import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class CacheMiddleware implements NestMiddleware {

    // resolve(url: string): MiddlewareFunction {
    //     return (request, res, next) => {
    //         const baseUrl = request.baseUrl;
    //         console.log(baseUrl);
    //         next();
    //     };
    // }

    resolve(): MiddlewareFunction{
        return (request, response, next) => {

            const nombreCookie = request.baseUrl;
            const existeCookie = request.cookies[nombreCookie];

            if(existeCookie){
                response.send('EN CACHE');
            }else{
                const registroCookie={
                    nombre: nombreCookie,
                    valor: true

                };
                response.cookie(registroCookie.nombre,registroCookie.valor);
                response.send('NO EN CACHE');
            }
            next();
        };
    }
}