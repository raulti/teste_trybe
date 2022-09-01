import { ObjectID } from 'typeorm';
import fs from 'fs';

import { Recipe } from '../entity/recipe';
import BusinessException from '../exeptions/BusinessException';
import RecipeRepository from '../repositories/recipe.repository';
import Message from '../config/messages';

export default class RecipeService {
  recipeRepository = new RecipeRepository();
  
  uploadPath = './src/uploads';

  save(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.findAll();
  }

  async findById(id: ObjectID): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      throw new BusinessException(404, Message.RECIPE_NOT_FOUND);
    }
    return recipe;
  }

  async update(recipe: Recipe): Promise<Recipe> {
    await this.findById(recipe._id);
    return this.save(recipe);
  }

  delete(id: ObjectID): void {
    this.recipeRepository.delete(id);
  }

  async saveImage(id: ObjectID, image: Express.Multer.File): Promise<Recipe> {
    const savedRecipe = await this.recipeRepository.findById(id);
    savedRecipe.image = `localhost:3000/src/uploads/${savedRecipe._id}.jpeg`;
    this.storageLocalImage(id, image);
    return this.update(savedRecipe);
  }

  storageLocalImage(recipeId, image: Express.Multer.File) {
    const newpath = `${this.uploadPath}/${recipeId}.jpeg`;
    fs.rename(image.path, newpath, function (err) {
      if (err) throw err;
      console.log('Successfully');
    });
  }

  async getImage(imageName: string) {
    return fs.readFileSync(`${this.uploadPath}/${imageName}`, {
      encoding: 'utf8',
    });
  }
}
