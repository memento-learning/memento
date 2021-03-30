import AuthService from '../../service/auth';

export default async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    try {
      const token = bearerHeader.split(' ')[1];
      const user = await AuthService.authenticate(token);
      if (user) {
        req.user = user;
        return next();
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
};
