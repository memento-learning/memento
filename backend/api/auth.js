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
    res.status(200).send({ token });
    return next();
  } catch (e) {
    res.sendStatus(401);
    return next(e);
  }
});

router.post('/isAuth', async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const { token } = req.cookies;
      const user = await AuthService.authenticate(token);
      if (user) {
        res.sendStatus(200);
        return next();
      }
    } catch (e) {
      res.sendStatus(401);
      return next;
    }
  }
  res.sendStatus(401);
  return next;
});

export default router;
