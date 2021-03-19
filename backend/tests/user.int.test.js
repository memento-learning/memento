import User from '../models/user';

describe('User Model', () => {
  const user = new User({ username: 'foo', password: 'bar' });
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
