import { Injectable } from '@nestjs/common';
import { PhotoReportsDao } from '../database/dao/photo-reports.dao';
import { PhotoReportDto } from '../dto/photo-report.dto';

@Injectable()
export class PhotoReportsService {
    constructor(private photoReportsDao: PhotoReportsDao) {
    }

    async create(photoReportDto: PhotoReportDto): Promise<PhotoReportDto> {
        return await this.photoReportsDao.create(photoReportDto) as PhotoReportDto;
    }

    async remove(photoReportId: string): Promise<boolean> {
        return await this.photoReportsDao.remove(photoReportId);
    }

    async findByPage(pageNumber: number): Promise<PhotoReportDto[]> {
        return await this.photoReportsDao.findByPage(pageNumber) as PhotoReportDto[];
    }

    async findAll(): Promise<PhotoReportDto[]> {
        return await this.photoReportsDao.findAll() as PhotoReportDto[];
    }
}