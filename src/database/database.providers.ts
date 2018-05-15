import * as mongoose from 'mongoose';
const MONGOURL: string = require('../../config.json').mongo_url;

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (): Promise<typeof mongoose> =>
            await mongoose.connect(MONGOURL),
    },
];