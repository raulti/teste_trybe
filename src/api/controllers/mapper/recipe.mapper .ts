import { Builder } from 'builder-pattern';
import { Request } from 'express';
import { ObjectID } from 'mongodb';

import { Recipe } from '../../entity/recipe';
import JwtService from '../../services/jwt.service';

class RecipeMapper {
  jwtService = new JwtService();

  recipeFromRequest(req: Request): Recipe {
    const userId = this.jwtService.getUserByHeadertoken(req)._id;
    return Builder<Recipe>(req.body).userId(userId).build();
  }

  idParamToObjectId(req: Request): ObjectID {
    return /[0-9A-Fa-f]{6}/g.test(req.params.id)
      ? new ObjectID(req.params.id)
      : '';
  }

  recipeResponse(recipeData: Recipe) {
    return { recipe: recipeData };
  }
}
export default new RecipeMapper();
