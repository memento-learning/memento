import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import api from '../api';

export default (app) => {
  app.use(cors());
  // parse requests of content-type: application/json
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/api', api);
};
