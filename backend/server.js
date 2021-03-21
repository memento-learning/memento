import express from 'express';
import loader from './loaders';

async function startServer() {
  const app = express();

  await loader(app);

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
}

startServer();
