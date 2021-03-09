import AuthService from '../../service/auth';

export default async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const { token } = req.cookies;
      const user = await AuthService.authenticate(token);
      if (user) {
        return next();
      }
    } catch (e) {
      console.log(e);
      return res.sendStatus(401);
    }
  }
  return res.sendStatus(401);
};
