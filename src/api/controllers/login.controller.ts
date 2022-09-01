import { NextFunction, Request, Response, Router } from 'express';

import LoginService from '../services/login.service';
import loginMapper from './mapper/login.mapper';

const route = Router();

export default (app: Router) => {
  app.use('/login', route);

  const loginService = new LoginService();

  route.post('', async (req: Request, res: Response, next: NextFunction) => {
    loginService
      .login(loginMapper.loginRequestFromRequest(req))
      .then((response) => {
        res.json(loginMapper.reponseJwtToken(response));
      })
      .catch((error) => {
        next(error);
      });
  });
};
