import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListResolverService } from './shopping-list-resolver.service';
import { NewIngredientsResolverService } from './newIngredients-resolver.service';

const shoppingListRouting: Routes = [
  {
    path: 'shopping-list',
    resolve: [ShoppingListResolverService, NewIngredientsResolverService],
    component: ShoppingListComponent,
    children: [
      { path: 'new', component: ShoppingEditComponent },
      { path: ':id/edit', component: ShoppingEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRouting)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule { }
