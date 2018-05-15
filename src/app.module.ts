import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EventsService } from './services/events.service';
import { NewsService } from './services/news.service';
import { PhotoReportsService } from './services/photo-reports.service';
import { EventsController } from './controllers/events.controller';
import { NewsController } from './controllers/news.controller';
import { PhotoReportsController } from './controllers/photo-reports.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
    imports: [ DatabaseModule ],
    controllers: [
        EventsController,
        NewsController,
        PhotoReportsController,
        UsersController,
    ],
    providers: [
        EventsService,
        NewsService,
        PhotoReportsService,
        UsersService
    ],
})
export class AppModule {
}
