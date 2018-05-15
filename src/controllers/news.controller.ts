import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { NewsDto } from '../dto/news.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IdDto } from '../dto/id.dto';
import { AuthenticationGuard } from '../middlewares/guards/authentication.guard';

@ApiBearerAuth()
@ApiUseTags('news')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post('create')
    @ApiOperation({ title: 'Create news' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during creating news.',
    })
    @UseGuards(AuthenticationGuard)
    async create(@Body() newsDto: NewsDto) {
        return this.newsService.create(newsDto);
    }

    @Post('remove')
    @ApiOperation({ title: 'Remove news' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully removed.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during removing news.',
    })
    @UseGuards(AuthenticationGuard)
    async remove(@Body() idDto: IdDto) {
        return this.newsService.remove(idDto.id);
    }

    @Get('findByPage')
    @ApiOperation({ title: 'Get page of news' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting news.',
    })
    async findByPage(@Query('pageNumber') pageNumber: number): Promise<NewsDto[]> {
        return this.newsService.findByPage(pageNumber);
    }

    @Get('findAll')
    @ApiOperation({ title: 'Get all news' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting news.',
    })
    async findAll(): Promise<NewsDto[]> {
        return this.newsService.findAll();
    }
}