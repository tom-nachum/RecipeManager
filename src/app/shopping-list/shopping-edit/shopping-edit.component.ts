import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  slForm: FormGroup;
  editMode = false;
  editingItemIdx: number;
  editedItem: Ingredient;
  message: string;
  ingredientName: string;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ShoppingEditComponent>,
    private dateService: DataStorageService
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      const urlArr = this.router.url.split('/');
      this.editMode = urlArr[urlArr.length - 1] == 'edit';
      if (this.editMode) {
        this.editingItemIdx = +urlArr[urlArr.length - 2];
        this.editedItem = this.shoppingListService.getIngredient(
          this.editingItemIdx
        );
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
        this.ingredientName = this.editedItem.name;
        this.message = 'Edit ' + this.editedItem.name ;
      } else {
        this.ingredientName = '';
        this.message = 'Add New Ingredient';
      }
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      this.onClear();
    });
  }

  initForm() {
    this.slForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.pattern("^[0-9,.]*$")]),
    });
  }

  onSubmit() {
    const name = this.slForm.value.name;
    const amount = +this.slForm.value.amount;
    if (this.editMode) {
      const ingredient = this.shoppingListService.getIngredient(
        this.editingItemIdx
      );
      ingredient.name = name;
      ingredient.amount = amount;
    } else {
      this.shoppingListService.addIngredient(new Ingredient(name, amount));
    }
    this.dateService.storeIngredients()
    this.dateService.storeNewIngredients()
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.router.navigate(['./shopping-list']);
    this.dialogRef.close();
  }
}
