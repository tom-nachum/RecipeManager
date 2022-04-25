import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  newItems :Set<String> = new Set<String>();

  private ingredients: Ingredient[] = [];

  private pushIngredient(ingredient: Ingredient){
    const idx = this.ingredientExists(ingredient);
      if (idx !== -1) {
        this.ingredients[idx].amount += +ingredient.amount
      } else {
        this.ingredients.push(ingredient);
      }
    this.newIngredient(ingredient.name)
  }

  addIngredient(ingredient: Ingredient): void {
    this.pushIngredient(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]): void {
    for (const newIngredient of newIngredients) {
      this.pushIngredient(newIngredient)
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  removeIngredient(index: number): void {
    this.ingredientViewed(index)
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  ingredientExists(newIngredient: Ingredient): number {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (newIngredient.name === this.ingredients[i].name) {
        return i;
      }
    }
    return -1;
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  ingredientViewed(idx: number){
    const ingredient = this.ingredients[idx]
    this.newItems.delete(ingredient.name)
  }

  newIngredient(name: String){
    this.newItems.add(name)
  }

  getNewIngredients(){
    return Array.from(this.newItems)
  }

  setNewIngredients(newIngredients: Set<String>){
    this.newItems = new Set(newIngredients)
  }

  countNewItems() : number{
    if (this.newItems){
      return this.newItems.size
    }
    else{
      return 0
    }
  }

}
