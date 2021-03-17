import mysql from 'mysql2/promise';
import model from '../models/model';

export default async (config = {}) => {
  try {
    const connnection = await mysql.createConnection({
      host: config.DB_HOST || process.env.DB_HOST,
      user: config.DB_USER || process.env.DB_USER,
      password: config.DB_PASS || process.env.DB_PASS,
      database: config.DB_NAME || process.env.DB_NAME,
    });

    model.setConnection(connnection);
    console.log('Connected to database.');
  } catch (err) {
    console.log('Error in connecting to database.');
    console.log(err);
  }
};
