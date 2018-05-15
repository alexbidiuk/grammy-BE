import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IEvent } from '../interfaces/event.interface';
import { EventDto } from '../../dto/event.dto';
const limit = require('../../../config.json').itemsOnPage;

@Injectable()
export class EventsDao {
    constructor(@Inject('EventModelToken') private readonly eventModel: Model<IEvent>) {
    }

    async create(eventDto: EventDto): Promise<IEvent> {
        try {
            const createdEvent: IEvent = await this.eventModel.create(eventDto);
            return createdEvent;
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during creating event', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async remove(eventId: string): Promise<boolean> {
        const event: IEvent = await this.eventModel.findById(eventId);
        if ( !event ) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        try {
            await event.remove();
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during removing event', HttpStatus.EXPECTATION_FAILED);
        }
        return true;
    }

    async findByPage(pageNumber: number): Promise<IEvent[]> {
        try {
            return await this.eventModel.find()
                             .sort({ createdAt: -1 })
                             .skip((pageNumber - 1) * limit)
                             .limit(limit)
                             .select('-_id -__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting events', HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll(): Promise<IEvent[]> {
        try {
            return await this.eventModel.find()
                             .sort({ createdAt: -1 })
                             .select('-__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting events', HttpStatus.EXPECTATION_FAILED);
        }
    }
}