import {config as conf} from 'dotenv';
conf();



const _config = {
    port: process.env.PORT,
    db_url:process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV
}

export const config = Object.freeze(_config);