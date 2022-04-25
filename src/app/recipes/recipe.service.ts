import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  getRecipes(): Recipe[] {
    // slice returns a copy of the array
    return this.recipes.slice();
  }

  getRecipe(idx: number): Recipe {
    return this.recipes[idx];
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(idx: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]): void {
    this.recipes[idx].name = name;
    this.recipes[idx].description = description;
    this.recipes[idx].imagePath = imagePath;
    this.recipes[idx].ingredients = ingredients;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(idx: number): void {
    this.recipes.splice(idx, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
