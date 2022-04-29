import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangedSubscription: Subscription;

  constructor(
    public shoppingListService: ShoppingListService,
    public authService: AuthService,
    private dialog: MatDialog,
    private dataService: DataStorageService,
  ) {}

  ngOnInit() {
    this.ingredientsChangedSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ngOnDestroy() {
    this.ingredientsChangedSubscription.unsubscribe();
  }

  addOrEditIngredient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false; // do not focus on exit button == first tapable element in the dialog.
    dialogConfig.width = '450px';
    dialogConfig.height = '322px';  
    this.dialog.open(ShoppingEditComponent, dialogConfig);
  }

  onDelete(idx: number) {
    this.shoppingListService.removeIngredient(idx);
    this.dataService.storeNewIngredients()
    this.dataService.storeIngredients()
  }

  onClickIngredient(idx){
    this.shoppingListService.ingredientViewed(idx)
    this.dataService.storeNewIngredients()
  }
}
