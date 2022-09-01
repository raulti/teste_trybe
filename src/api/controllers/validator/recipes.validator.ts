import { check } from 'express-validator';
import Message from '../../config/messages';

export class RecipesValidator {
  static recipesSaveValidator() {
    return [
      check('name').notEmpty().withMessage(Message.INVALID_ENTRIES),
      check('ingredients').notEmpty().withMessage(Message.INVALID_ENTRIES),
      check('preparation').notEmpty().withMessage(Message.INVALID_ENTRIES),
    ];
  }
}
