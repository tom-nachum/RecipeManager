import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

const DB_URL = 'https://tom-recipe-manager-default-rtdb.firebaseio.com/';

@Injectable({ providedIn: 'root' })
//this will add the current service to the providers property in app module.
// this is an alternative to just write it in the app module providers property.
export class DataStorageService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService,
    private shoppingListService: ShoppingListService) { }


  private userDirectory() {
    return DB_URL + 'UsersData/' + this.authService.getUserTitle()
  }

  private defaultDataDirectory() {
    return DB_URL + 'DefaultData'
  }

  fetchDefaultRecipes() {
    return this.http
      .get<Recipe[]>(this.defaultDataDirectory() + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            //the 3 dots are known as the "spread operator"
            //it basically spreading the element of an array/object
            //or for initializing an array or object from another array or object
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchDefaultIngredients() {
    return this.http
      .get<Ingredient[]>(this.defaultDataDirectory() + '/shopping-list.json')
      .pipe(
        map(
          (ingredients_data: { "amount": number, "name": string }[]) => {
            var ingredients = new Array<Ingredient>()
            var i = 0
            ingredients_data.forEach(element => {
              ingredients[i] = new Ingredient(element.name, element.amount)
              i += 1
            })
            return ingredients
          }),
        tap((ingredients) => {
          this.shoppingListService.setIngredients(ingredients)
          console.log(ingredients)
        })
      )
  }

  storeIngredients() {
    this.http.put<Ingredient[]>(this.userDirectory() + '/shopping-list.json', this.shoppingListService.getIngredients())
      .subscribe((data) => {
        //
      });
  }

  fetchIngredients() {
    return this.http
      .get<Ingredient[]>(this.userDirectory() + '/shopping-list.json')
      .pipe(
        map(
          (ingredients_data: { "amount": number, "name": string }[]) => {
            var ingredients = new Array<Ingredient>()
            if (ingredients_data == null) {
              return null
            }
            else {
              var i = 0
              ingredients_data.forEach(element => {
                ingredients[i] = new Ingredient(element.name, element.amount)
                i += 1
              })
            }
            return ingredients
          }),
        tap((ingredients) => {
          if (ingredients != null) {
            this.shoppingListService.setIngredients(ingredients)
          }
        })
      )
  }

  storeRecipes() {
    console.log(this.recipeService.getRecipes())
    this.http
      //put method deletes all data in the DB and put the new data.
      .put<Recipe[]>(this.userDirectory() + '/recipes.json', this.recipeService.getRecipes())
      .subscribe((data) => {
        //
        console.log(data)
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.userDirectory() + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          if (recipes == null) {
            return null
          }
          return recipes.map((recipe) => {
            //the 3 dots are known as the "spread operator"
            //it basically spreading the element of an array/object
            //or for initializing an array or object from another array or object
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          if (recipes != null) {
            this.recipeService.setRecipes(recipes);
          }
        })
      );
  }

  storeNewIngredients() {
    this.http.put<String[]>(this.userDirectory() + '/new-ingredients.json', this.shoppingListService.getNewIngredients())
      .subscribe((data) => {
      });
  }

  fetchNewIngredients() {
    return this.http.get<String[]>(this.userDirectory() + '/new-ingredients.json')
      .pipe(
        map(
          (data: String[]) => {
            var newIngredients = new Set<String>()
            if (data == null) {
              return newIngredients
            }
            data.forEach(element => {
              newIngredients.add(element)
            });
            return newIngredients
          }
        ),
        tap(
          newIngredients => {
            this.shoppingListService.setNewIngredients(newIngredients)
          }
        )
      )
  }
}
