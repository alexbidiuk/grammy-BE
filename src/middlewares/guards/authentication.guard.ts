import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
const JWTSECRET: string = require('../../../config.json').jwt_secret;
const ADMINUSERNAME: string = require('../../../config.json').admin.username;
const ADMINPASSWORD: string = require('../../../config.json').admin.password;

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor() {
    }

    canActivate(context: ExecutionContext): boolean {
        const token: string = context.switchToHttp().getRequest().get('token');
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, JWTSECRET);
        } catch (e) {
            throw new HttpException('Please login first', HttpStatus.UNAUTHORIZED);
        }

        return decodedToken.username === ADMINUSERNAME && decodedToken.password === ADMINPASSWORD;

    }
}