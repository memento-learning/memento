import User from './models/user';

import rds from './loaders/rds';

async function run() {
  await rds();
  const username = 'ammunation';
  const password = 'ammuammu';
  const user = new User({ username, password });
  await user.create();
  console.log(user);
  process.exit();
}

run();
