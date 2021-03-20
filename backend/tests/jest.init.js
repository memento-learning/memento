import 'regenerator-runtime/runtime';
import rds from '../loaders/rds';
import Model from '../models/model';

beforeAll(async () => {
  await rds();
});

afterAll(async () => {
  await Model.connection.end();
});
