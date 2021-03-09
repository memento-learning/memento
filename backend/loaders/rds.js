import mysql from 'mysql2/promise';
import model from '../models/model';

export default async () => {
  try {
    const connnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'memento',
    });

    model.setConnection(connnection);
    console.log('Connected to database.');
  } catch (err) {
    console.log('Error in connecting to database.');
    console.log(err);
  }
};
