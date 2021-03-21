import User from '../models/user';

describe('User Model', () => {
  const randomUsername = Math.random().toString(36).substring(10);
  const user = new User({ username: randomUsername, password: 'bar' });
  test('User Create', async () => {
    await user.create();
    expect(user.user_id).toBeTruthy();
  });
  test('User Delete', async () => {
    const userId = user.user_id;
    await user.delete();
    const sameUser = await User.getById(userId);
    expect(sameUser).toBeFalsy();
  });
});
