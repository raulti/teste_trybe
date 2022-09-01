import { Router } from 'express';
import loginController from './login.controller';
import recipesController from './recipes.controller';
import userController from './user.controller';

export default (app: Router) => {
  userController(app);
  loginController(app);
  recipesController(app);
  return app;
};
