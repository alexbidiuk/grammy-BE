import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { EventsProviders } from './providers/events.providers';
import { NewsProviders } from './providers/news.providers';
import { PhotoReportProviders } from './providers/photo-report.providers';
import { EventsDao } from './dao/events.dao';
import { NewsDao } from './dao/news.dao';
import { PhotoReportsDao } from './dao/photo-reports.dao';

@Module({
    providers: [
        ...databaseProviders,
        ...EventsProviders,
        ...NewsProviders,
        ...PhotoReportProviders,
        EventsDao,
        NewsDao,
        PhotoReportsDao
    ],
    exports: [
        EventsDao,
        NewsDao,
        PhotoReportsDao
    ],
})
export class DatabaseModule {
}