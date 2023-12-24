import * as dotenv from 'dotenv';
dotenv.config();

import {IConfig} from './interface/CommonInterface'

export const config:IConfig = {
    JWT_SECRET:process.env.JWT_SECRET || '',
    DATABASE_URL:process.env.DATABASE_URL || '',
    PORT:parseInt(process.env.PORT || '3000',10)
}