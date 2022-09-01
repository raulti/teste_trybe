import { ObjectID } from 'typeorm';
import { Database } from '../config/database';
import { Recipe } from '../entity/recipe';

export default class RecipeRepository {
  recipe = Database.manager.connection.getRepository(Recipe);
  
  save(recipe: Recipe): Promise<Recipe> {
    return this.recipe.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipe.find();
  }

  findById(id: ObjectID): Promise<Recipe> {
    return this.recipe.findOne({ where: { _id: id } });
  }

  delete(id: ObjectID): void {
    this.recipe.delete(id);
  }
}
