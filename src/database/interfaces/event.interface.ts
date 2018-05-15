import { IMediaLink } from './media-link.interface';
import {Document} from 'mongoose';

export interface IEvent extends Document {
    createdAt: Date,
    updatedAt: Date,
    name: string;
    date: string;
    price: string;
    title: string;
    subtitle: string;
    paymentLink: string;
    getResponseLink: string;
    description: string;
    mediaLinks: IMediaLink[];
    logoLink: string;
    posterLink: string;
}