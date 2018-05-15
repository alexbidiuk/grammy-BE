import * as mongoose from 'mongoose';
import { MediaLinkSchema } from './media-link.schema';
import { IEvent } from '../interfaces/event.interface';

export const EventSchema = new mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    name: String,
    date: String,
    price: Number,
    title: String,
    subtitle: String,
    paymentLink: String,
    getResponseLink: String,
    description: String,
    mediaLinks: {
        type: [MediaLinkSchema],
        required: false,
        default: []
    },
    logoLink: String,
    posterLink: String,
});

EventSchema.pre<IEvent>('save', function (next) {
    if ( this.isNew ) {
        this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
});