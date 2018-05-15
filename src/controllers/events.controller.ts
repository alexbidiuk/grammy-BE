import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventDto } from '../dto/event.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { IdDto } from '../dto/id.dto';
import { AuthenticationGuard } from '../middlewares/guards/authentication.guard';

@ApiBearerAuth()
@ApiUseTags('events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post('create')
    @ApiOperation({ title: 'Create event' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during creating event.',
    })
    @UseGuards(AuthenticationGuard)
    async create(@Body() eventDto: EventDto) {
        return this.eventsService.create(eventDto);
    }

    @Post('remove')
    @ApiOperation({ title: 'Remove event' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully removed.',
    })
    @ApiResponse({
        status: 422,
        description: 'Error during removing event.',
    })
    @UseGuards(AuthenticationGuard)
    async remove(@Body() idDto: IdDto) {
        return this.eventsService.remove(idDto.id);
    }

    @Get('findByPage')
    @ApiOperation({ title: 'Get page of events' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting events.',
    })
    async findByPage(@Query('pageNumber') pageNumber: number): Promise<EventDto[]> {
        return this.eventsService.findByPage(pageNumber);
    }

    @Get('findAll')
    @ApiOperation({ title: 'Get all events' })
    @ApiResponse({
        status: 201,
        description: 'The records has been successfully extracted.',
    })
    @ApiResponse({
        status: 417,
        description: 'Error during extracting events.',
    })
    async findAll(): Promise<EventDto[]> {
        return this.eventsService.findAll();
    }
}