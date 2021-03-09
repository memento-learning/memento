import expressLoader from './express';
import rds from './rds';

export default async (app) => {
  try {
    await rds();
    expressLoader(app);
  } catch (err) {
    console.log(err);
  }
};
