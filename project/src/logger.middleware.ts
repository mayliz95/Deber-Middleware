import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    resolve(nivelDeLog: string): MiddlewareFunction {
        return (request, res, next) => {
            const respuesta = {
                baseUrl: request.baseUrl,
                hostname: request.hostname,
                subdomains: request.subdomains,
                ip: request.ip,
                method: request.method,
                originalUrl: request.originalUrl,
                path: request.path,
                protocol: request.protocol,
                headers: request.headers,
            };
            if(nivelDeLog === "archivo") {
                fs.writeFileSync(__dirname +'/log.txt', JSON.stringify(respuesta), );
            } else if (nivelDeLog === "consola") {
                console.log(respuesta);
            } else if(nivelDeLog === "todo") {
                fs.writeFileSync(__dirname +'/log.txt', JSON.stringify(respuesta), );
                console.log(respuesta);
            }
            next();
        };
    }
}
