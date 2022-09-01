import { check } from 'express-validator';

import Message from '../../config/messages';
import UserService from '../../services/user.service';

export class UserValidator {
  static userService = new UserService();

  static userSaveRequestValidator() {
    return [
      check('email').isEmail().withMessage(Message.INVALID_ENTRIES),
      check('email').notEmpty().withMessage(Message.INVALID_ENTRIES),
      check('name').notEmpty().withMessage(Message.INVALID_ENTRIES),
      check('password').notEmpty().withMessage(Message.INVALID_ENTRIES),
    ];
  }
}
