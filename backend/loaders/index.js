import expressLoader from './express';
import rds from './rds';

export default async (app, rdsConfig = {}) => {
  try {
    await rds(rdsConfig);
    expressLoader(app);
  } catch (err) {
    console.log(err);
  }
};
