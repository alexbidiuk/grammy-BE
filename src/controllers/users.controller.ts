import { Controller, Post, Body } from '@nestjs/common';
import { EventDto } from '../dto/event.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { LoginDto } from '../dto/login.dto';

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('login')
    @ApiOperation({ title: 'Login user' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during creating event.',
    })
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }
}