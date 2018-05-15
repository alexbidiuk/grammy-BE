import * as mongoose from 'mongoose';
import { MediaLinkSchema } from './media-link.schema';
import { INews } from '../interfaces/news.interface';

export const NewsSchema = new mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    title: String,
    subtitle: String,
    description: String,
    mediaLinks: {
        type: [MediaLinkSchema],
        required: false,
        default: []
    }
});

NewsSchema.pre<INews>('save', function (next) {
    if ( this.isNew ) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});