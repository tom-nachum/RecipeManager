import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeIdx: number;

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private dataStorage: DataStorageService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeIdx = params['id'];
      this.recipe = this.recipeService.getRecipe(this.recipeIdx);
    });
  }

  toShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
    this.dataStorage.storeIngredients()
    this.dataStorage.storeNewIngredients()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.position = { top: '2%' }
    dialogConfig.panelClass = 'custom-dialog'
    dialogConfig.data = { name: this.recipe.name }
    const timeout = 3000;
    let dialogRef = this.dialog.open(SuccessDialogComponent, dialogConfig)
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
  }

  onDelete() {
    if (confirm("Are you sure you want to delete " + this.recipe.name + " recipe?")) {
      this.recipeService.deleteRecipe(this.recipeIdx);
      this.dataStorage.storeRecipes();
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

}
