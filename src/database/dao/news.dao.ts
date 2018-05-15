import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { INews } from '../interfaces/news.interface';
import { NewsDto } from '../../dto/news.dto';
const limit = require('../../../config.json').itemsOnPage;

@Injectable()
export class NewsDao {
    constructor(@Inject('NewsModelToken') private readonly newsModel: Model<INews>) {
    }

    async create(newsDto: NewsDto): Promise<INews> {
        try {
            const createdNews: INews = await this.newsModel.create(newsDto);
            return createdNews;
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during creating event', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async remove(newsId: string): Promise<boolean> {
        const news: INews = await this.newsModel.findById(newsId);
        if ( !news ) {
            throw new HttpException('News not found', HttpStatus.NOT_FOUND);
        }
        try {
            await news.remove();
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during removing news', HttpStatus.EXPECTATION_FAILED);
        }
        return true;
    }

    async findByPage(pageNumber: number): Promise<INews[]> {
        try {
            return await this.newsModel.find()
                             .sort({ createdAt: -1 })
                             .skip((pageNumber - 1) * limit)
                             .limit(limit)
                             .select('-_id -__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting news', HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll(): Promise<INews[]> {
        try {
            return await this.newsModel.find()
                             .sort({ createdAt: -1 })
                             .select('-__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting news', HttpStatus.EXPECTATION_FAILED);
        }
    }
}