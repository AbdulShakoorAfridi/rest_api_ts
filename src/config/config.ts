import {config as conf} from 'dotenv';
conf();



const _config = {
    port: process.env.PORT,
    db_url:process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET
}

export const config = Object.freeze(_config);
