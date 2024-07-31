import dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey';
export const PORT = process.env.PORT || 5600;
export const MONGODBURL = process.env.MONGODBURL || '';
export const NODE_ENV = process.env.NODE_ENV || 'development';