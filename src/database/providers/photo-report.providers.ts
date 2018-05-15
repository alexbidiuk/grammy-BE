import{ Connection } from 'mongoose';
import { IPhotoReport } from '../interfaces/photo-report.interface';
import { PhotoReportSchema } from '../schemas/photo-report.schema';

export const PhotoReportProviders = [
    {
        provide: 'PhotoReportModelToken',
        useFactory: (connection: Connection) => connection.model<IPhotoReport>('PhotoReport', PhotoReportSchema),
        inject: ['DbConnectionToken'],
    },
];