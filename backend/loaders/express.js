import bodyParser from 'body-parser';
import cors from 'cors';
import api from '../api';

export default (app) => {
  app.use(cors());
  // parse requests of content-type: application/json
  app.use(bodyParser.json());
  app.use('/api', api);
};
