import * as mongoose from 'mongoose';

export const MediaLinkSchema = new mongoose.Schema({
    type: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});