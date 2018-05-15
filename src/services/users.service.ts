import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { TokenDto } from '../dto/token.dto';
import * as jwt from 'jsonwebtoken';
const JWTSECRET: string = require('../../config.json').jwt_secret;

const ADMINUSERNAME: string = require('../../config.json').admin.username;
const ADMINPASSWORD: string = require('../../config.json').admin.password;

@Injectable()
export class UsersService {
    constructor() {
    }

    async login(loginDto: LoginDto): Promise<TokenDto> {
        if (loginDto.username === ADMINUSERNAME && loginDto.password === ADMINPASSWORD ) {
            const token: string = jwt.sign({
                username: ADMINUSERNAME,
                password: ADMINPASSWORD
            }, JWTSECRET, { expiresIn: 172800 }); // 172800s = 48h

            return new TokenDto(token);
        } else {
            throw new HttpException('Wrong username or password', HttpStatus.I_AM_A_TEAPOT);
        }
    }
}