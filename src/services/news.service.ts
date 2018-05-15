import { Injectable } from '@nestjs/common';
import { NewsDao } from '../database/dao/news.dao';
import { NewsDto } from '../dto/news.dto';

@Injectable()
export class NewsService {
    constructor(private newsDao: NewsDao) {
    }

    async create(newsDto: NewsDto): Promise<NewsDto> {
        return await this.newsDao.create(newsDto) as NewsDto;
    }

    async remove(newsId: string): Promise<boolean> {
        return await this.newsDao.remove(newsId);
    }

    async findByPage(pageNumber: number): Promise<NewsDto[]> {
        return await this.newsDao.findByPage(pageNumber) as NewsDto[];
    }

    async findAll(): Promise<NewsDto[]> {
        return await this.newsDao.findAll() as NewsDto[];
    }
}