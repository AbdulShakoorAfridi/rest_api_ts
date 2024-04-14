import {config as conf} from 'dotenv';
conf();



const _config = {
    port: process.env.PORT,
    db_url:process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINERY_CLOUD: process.env.CLOUDINERY_CLOUD,
    CLOUDINERY_API_KEY: process.env.CLOUDINERY_API_KEY,
    CLOUDINERY_API_SECRET: process.env.CLOUDINERY_API_SECRET,
}

export const config = Object.freeze(_config);
