import { Model } from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IPhotoReport } from '../interfaces/photo-report.interface';
import { PhotoReportDto } from '../../dto/photo-report.dto';
const limit = require('../../../config.json').itemsOnPage;

@Injectable()
export class PhotoReportsDao {
    constructor(@Inject('PhotoReportModelToken') private readonly photoReportModel: Model<IPhotoReport>) {
    }

    async create(photoReportDto: PhotoReportDto): Promise<IPhotoReport> {
        try {
            return await this.photoReportModel.create(photoReportDto);
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during creating photo report', HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async remove(photoReportId: string): Promise<boolean> {
        const photoReport: IPhotoReport = await this.photoReportModel.findById(photoReportId);
        if ( !photoReport ) {
            throw new HttpException('Photo report not found', HttpStatus.NOT_FOUND);
        }
        try {
            await photoReport.remove();
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during removing photo report', HttpStatus.EXPECTATION_FAILED);
        }
        return true;
    }

    async findByPage(pageNumber: number): Promise<IPhotoReport[]> {
        try {
            return await this.photoReportModel.find()
                             .sort({ createdAt: -1 })
                             .skip((pageNumber - 1) * limit)
                             .limit(limit)
                             .select('-_id -__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting photo report', HttpStatus.EXPECTATION_FAILED);
        }
    }

    async findAll(): Promise<IPhotoReport[]> {
        try {
            return await this.photoReportModel.find()
                             .sort({ createdAt: -1 })
                             .select('-__v');
        } catch (e) {
            console.log(e);
            throw new HttpException('Error during extracting photo report', HttpStatus.EXPECTATION_FAILED);
        }
    }
}