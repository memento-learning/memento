import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';

class AuthService {
  static async signup(username, rawPassword) {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(rawPassword, salt);
    const user = new User(username, password);
    await user.create();
  }

  static async login(username, rawPassword) {
    const user = await User.getByUsername(username);
    if (!bcrypt.compareSync(rawPassword, user.password)) {
      throw Error('Incorrect password');
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.SECRET, { expiresIn: 24 * 60 * 60 });

    return { user, token };
  }

  static async authenticate(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user_id = decoded.id;
    const user = User.getById(user_id);
    if (user == null){
      throw Error('User does not exist.');
    }
    return user;
  }
}

export default AuthService;
