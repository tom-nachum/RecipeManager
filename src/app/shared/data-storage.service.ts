import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

const DB_URL = 'https://tom-recipe-manager-default-rtdb.firebaseio.com/';

const PIZZA_IMG_URL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=980:*'
const PIZZA_DESCRIPTTION = 'This is a classic homemade pizza recipe, including a pizza dough recipe and topping suggestions. Make perfect pizza at home!'
const PIZZA = new Recipe("Pizza", PIZZA_DESCRIPTTION, PIZZA_IMG_URL,
  [new Ingredient("Pizza dough", 1),
  new Ingredient("Spoon of Olive oil", 1),
  new Ingredient("Mozzarella cheese", 3),
  new Ingredient("Cup of pizza sauce", 1),
  ])

const HAMBURGER_IMG_URL = 'https://www.landwercafe.co.il/wp-content/uploads/2020/01/%D7%94%D7%9E%D7%91%D7%95%D7%A8%D7%92%D7%A8-scaled.jpg'
const HAMBURGER_DESCRIPTION = 'Who doesn\'t like a good hamburger? 20 minutes cook and serve!'
const HAMBURGER = new Recipe("Hamburger", HAMBURGER_DESCRIPTION, HAMBURGER_IMG_URL,
  [new Ingredient("Ground beef pounds", 1),
  new Ingredient("Onion", 1),
  new Ingredient("Tomato", 1),
  new Ingredient("Bread", 2)])

const CHOCOLATE_BALLS_IMG_URL = 'https://d3o5sihylz93ps.cloudfront.net/app/uploads/2019/03/13134210/%D7%90%D7%A1%D7%A3-%D7%90%D7%9E%D7%91%D7%A8%D7%9D-00493.jpg'
const CHOCOLATE_BALLS_DESCRIPTION = 'Makes about 16 Chocolate Balls. Preparation time 30 minutes.'
const CHOCOLATE_BALLS = new Recipe("Chocolate balls", CHOCOLATE_BALLS_DESCRIPTION, CHOCOLATE_BALLS_IMG_URL,
  [new Ingredient("Sugar cup", 0.5),
  new Ingredient("Vanilla extract teaspoon", 1),
  new Ingredient("Cocoa powder cups", 0.25),
  new Ingredient("Biscuits grams", 200)])

const DEFAULT_RECIPES = [PIZZA, HAMBURGER, CHOCOLATE_BALLS]


@Injectable({ providedIn: 'root' })
//this will add the current service to the providers property in app module.
// this is an alternative to just write it in the app module providers property.
export class DataStorageService {
  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: AuthService,
    private shoppingListService: ShoppingListService) { }


  storeNewIngredients() {
    this.http.put<String[]>(DB_URL + this.authService.getUserName() + '/new-ingredients.json', this.shoppingListService.getNewIngredients())
      .subscribe((data) => {
      });
  }

  fetchNewIngredients() {
    return this.http.get<String[]>(DB_URL + this.authService.getUserName() + '/new-ingredients.json')
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

  storeIngredients() {
    this.http.put<Ingredient[]>(DB_URL + this.authService.getUserName() + '/shopping-list.json', this.shoppingListService.getIngredients())
      .subscribe((data) => {
        //
      });
  }

  fetchIngredients() {
    return this.http
      .get<Ingredient[]>(DB_URL + this.authService.getUserName() + '/shopping-list.json')
      .pipe(
        map(
          (ingredients_data: { "amount": number, "name": string }[]) => {
            var ingredients = new Array<Ingredient>()
            if (ingredients_data == null) {
              ingredients = [new Ingredient("Pizza dough", 1),
              new Ingredient("Spoon of Olive oil", 1),
              new Ingredient("Mozzarella cheese", 3),
              new Ingredient("Cup of pizza sauce", 1),
              ]
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
          this.shoppingListService.setIngredients(ingredients)
        })
      )
  }


  storeRecipes() {
    this.http
      //put method deletes all data in the DB and put the new data.
      .put<Recipe[]>(DB_URL + this.authService.getUserName() + '/recipes.json', this.recipeService.getRecipes())
      .subscribe((data) => {
        //
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(DB_URL + this.authService.getUserName() + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          if (recipes == null) {
            recipes = DEFAULT_RECIPES
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
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
