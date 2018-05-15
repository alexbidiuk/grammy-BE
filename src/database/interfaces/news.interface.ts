import { IMediaLink } from './media-link.interface';
import { Document } from 'mongoose';

export interface INews extends Document{
    createdAt: Date,
    updatedAt: Date,
    title: string;
    subtitle: string;
    description: string;
    mediaLinks: IMediaLink[];
}