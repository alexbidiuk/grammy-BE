import { Connection } from 'mongoose';
import { EventSchema } from '../schemas/event.schema';
import { IEvent } from '../interfaces/event.interface';

export const EventsProviders = [
    {
        provide: 'EventModelToken',
        useFactory: (connection: Connection) => connection.model<IEvent>('Event', EventSchema),
        inject: ['DbConnectionToken'],
    },
];