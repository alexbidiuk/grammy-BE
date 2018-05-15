import * as mongoose from 'mongoose';
import { MediaLinkSchema } from './media-link.schema';

export const PhotoReportSchema = new mongoose.Schema({
    title: String,
    mediaLinks: {
        type: [MediaLinkSchema],
        required: false,
        default: []
    }
});