import { Injectable } from '@nestjs/common';
import { EventsDao } from '../database/dao/events.dao';
import { EventDto } from '../dto/event.dto';

@Injectable()
export class EventsService {
    constructor(private eventsDao: EventsDao) {
    }

    async create(eventDto: EventDto): Promise<EventDto> {
        return await this.eventsDao.create(eventDto) as EventDto;
    }

    async remove(eventId: string): Promise<boolean> {
        return await this.eventsDao.remove(eventId);
    }

    async findByPage(pageNumber: number): Promise<EventDto[]> {
        return await this.eventsDao.findByPage(pageNumber) as EventDto[];
    }

    async findAll(): Promise<EventDto[]> {
        return await this.eventsDao.findAll() as EventDto[];
    }
}