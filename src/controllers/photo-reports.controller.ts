import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PhotoReportsService } from '../services/photo-reports.service';
import { PhotoReportDto } from '../dto/photo-report.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IdDto } from '../dto/id.dto';
import { AuthenticationGuard } from '../middlewares/guards/authentication.guard';

@ApiBearerAuth()
@ApiUseTags('photoReports')
@Controller('photoReports')
export class PhotoReportsController {
    constructor(private readonly photoReportsService: PhotoReportsService) {}

    @Post('create')
    @ApiOperation({ title: 'Create photo report' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during creating photo reports.',
    })
    @UseGuards(AuthenticationGuard)
    async create(@Body() photoReportsDto: PhotoReportDto) {
        return this.photoReportsService.create(photoReportsDto);
    }

    @Post('remove')
    @ApiOperation({ title: 'Remove photo reports' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully removed.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during removing photo reports.',
    })
    @UseGuards(AuthenticationGuard)
    async remove(@Body() idDto: IdDto) {
        return this.photoReportsService.remove(idDto.id);
    }

    @Get('findByPage')
    @ApiOperation({ title: 'Get page of photo reports' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting photo reports.',
    })
    async findByPage(@Query('pageNumber') pageNumber: number): Promise<PhotoReportDto[]> {
        return this.photoReportsService.findByPage(pageNumber);
    }

    @Get('findAll')
    @ApiOperation({ title: 'Get all photo reports' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting photo reports.',
    })
    async findAll(): Promise<PhotoReportDto[]> {
        return this.photoReportsService.findAll();
    }
}