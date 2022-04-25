import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        ShoppingListRoutingModule,
    ]
})
export class ShoppingListModule {}
