import { IMediaLink } from './media-link.interface';
import { Document } from 'mongoose';
export interface IPhotoReport extends Document {
    title: string;
    mediaLinks: IMediaLink[];
}