import { NextFunction, Request, Response } from 'express';
import Message from '../config/messages';
import recipeMapper from '../controllers/mapper/recipe.mapper ';
import RecipeRepository from '../repositories/recipe.repository';
import JwtService from '../services/jwt.service';

const jwtService = new JwtService();
const recipeRepository = new RecipeRepository();

export default function recipe(...permissionExclude) {
  return async (request: Request, response: Response, next: NextFunction) => {
    if (!jwtService.getTokenByRequest(request)) {
      response.status(401).json({ message: Message.MISSING_TOKEN });
    } else if (
      isExcludePermission(request, permissionExclude) 
      || (await isCanAction(request))
    ) {
      next();
    } else {
      response.status(401).json({ message: Message.JWT_MALFORMED });
    }
  };
}

function isExcludePermission(request, permissionExclude) {
  return permissionExclude == jwtService.getUserByHeadertoken(request)?.role;
}

async function isCanAction(request) {
  const recipeSaved = await recipeRepository.findById(
    recipeMapper.idParamToObjectId(request),
  );
  const userId = jwtService.getUserByHeadertoken(request)?._id;
  return recipeSaved && recipeSaved.userId == userId;
}
