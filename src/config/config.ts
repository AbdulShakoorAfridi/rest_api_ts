import {config as conf} from 'dotenv';
conf();



const _config = {
    port: process.env.PORT,
    db_url:process.env.DB_URL
}

export const config = Object.freeze(_config);
