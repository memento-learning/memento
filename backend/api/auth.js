import { Router } from 'express';
import User from '../models/user';
import AuthService from '../service/auth';

const router = Router();

router.get('/hello', async (_, res, next) => {
  try {
    const user = await User.getOne();
    return res.send(`${user.username} says hi from database and server`);
  } catch (e) {
    return next(e);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    await AuthService.signup(req.body.username, req.body.password);
    res.status(201).send('User created!');
    return next();
  } catch (e) {
    return next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { token } = await AuthService.login(req.body.username, req.body.password);
    res.cookie('token', token).status(200).send('Login Successful!');
    return next();
  } catch (e) {
    return next(e);
  }
});

export default router;
