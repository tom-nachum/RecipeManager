import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPipe } from './user.pipe';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatIconModule } from '@angular/material/icon';
import { AutoCompleteOffDirective } from './auto-complete-off.directive';
import { AddButtonComponent } from './add-button/add-button.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective,
        UserPipe,
        ErrorMessageComponent,
        AutoCompleteOffDirective,
        AddButtonComponent,
        SuccessDialogComponent,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports: [
        LoadingSpinnerComponent,
        DropdownDirective,
        UserPipe,
        ErrorMessageComponent,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        AutoCompleteOffDirective,
        AddButtonComponent,
        SuccessDialogComponent
    ]
})
export class SharedModule {}
