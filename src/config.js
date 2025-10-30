import {config} from 'dotenv';

config();

export default {
    dbuser: process.env.DB_USER,
    dbpassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
};

export {config};