import { Connection } from 'mongoose';
import { INews } from '../interfaces/news.interface';
import { NewsSchema } from '../schemas/news.schema';

export const NewsProviders = [
    {
        provide: 'NewsModelToken',
        useFactory: (connection: Connection) => connection.model<INews>('News', NewsSchema),
        inject: ['DbConnectionToken'],
    },
];