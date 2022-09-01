import { NextFunction, Request, Response, Router } from 'express';
import UserService from '../services/user.service';
import { UserValidator } from './validator/user.validator';
import ValidationMiddleware from '../middleware/validation.middleware';
import UserMapper from './mapper/user.mapper';
import Permission from '../middleware/permission.middleware';
import RoleEnum from '../models/enum/role.enum';
import AuthMiddleware from '../middleware/auth.middleware';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  const userService = new UserService();

  route.post(
    '/',
    UserValidator.userSaveRequestValidator(),
    ValidationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      userService
        .save(UserMapper.userFromRequest(req))
        .then((response) => {
          res.status(201).json(UserMapper.userResponse(response));
        })
        .catch((error) => {
          next(error);
        });
    },
  );

  route.post(
    '/admin',
    AuthMiddleware,
    Permission(RoleEnum.ADMIN),
    UserValidator.userSaveRequestValidator(),
    ValidationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      userService
        .save(UserMapper.userAdminFromRequest(req))
        .then((response) => {
          res.status(201).json(UserMapper.userResponse(response));
        })
        .catch((error) => {
          next(error);
        });
    },
  );
};
