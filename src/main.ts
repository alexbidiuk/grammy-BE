import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
    const server = express();
    server.use(express.static(path.join(__dirname, '../public')));

    const app = await NestFactory.create(AppModule, server, {});
    app.setGlobalPrefix('v1');
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));

    const IS_APP_FOUND: boolean = fs.existsSync(path.join(__dirname, '../public/html', 'index.html'));

    app.use('*', function (req, res, next) {
        if ( req.baseUrl.startsWith('/api') || (req.baseUrl.startsWith('/v1') ) ) {
            if ( req && req.headers && req.headers.origin ) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin as string);
            }
            next();
        } else {
            delegateHandlingRequestToApp(req, res);
        }
    });

    const options = new DocumentBuilder()
        .setTitle('Grammy backend')
        .setDescription('Grammy backend API')
        .setVersion('1.0')
        .addTag('grammy')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port);

    function delegateHandlingRequestToApp(req, res): void {
        if ( IS_APP_FOUND ) {
            if (req.baseUrl.startsWith('/admin/events') ) {
                res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
            } else if ( req.baseUrl.startsWith('/admin/news') ) {
                res.sendFile(path.join(__dirname, '../public/html', 'news.html'));
            } else if ( req.baseUrl.startsWith('/admin/photo') ) {
                res.sendFile(path.join(__dirname, '../public/html', 'photo.html'));
            } else if ( req.baseUrl.startsWith('/admin') ) {
                res.sendFile(path.join(__dirname, '../public/html/pages', 'login.html'));
            }
        } else {
            res.status(HttpStatus.NOT_FOUND)
               .send(new HttpException('frontend was not found', HttpStatus.NOT_FOUND));
        }
    }
}
bootstrap();
