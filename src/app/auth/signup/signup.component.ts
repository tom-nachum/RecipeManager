import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { AuthResopnseData, AuthService } from '../auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isLoading = false;

  constructor(private router: Router,     
    private authService: AuthService,
    private dialog: MatDialog,
    private renderer:Renderer2,
    private dataStorage: DataStorageService,
    ) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResopnseData>;
    this.dataStorage.fetchDefaultRecipes().subscribe()
    this.dataStorage.fetchDefaultIngredients().subscribe() 
    authObservable = this.authService.signUp(email, password);
    authObservable.subscribe(
      (resData) => {
        this.dataStorage.storeRecipes()
        this.dataStorage.storeIngredients()
        this.router.navigate(['/recipes']);
      },
      (errorMessage:string) => {
        this.errorHandler(errorMessage);
      }
    );
  }

  toLogIn() {
    this.router.navigate(['/auth', 'login']);
  }

  private errorHandler(errorMessage: string) {
    this.isLoading = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.height = '270px';
    dialogConfig.data = errorMessage;
    let dialogRef = this.dialog.open(ErrorMessageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.isLoading = false;
    });
  }

  onClick(pass){
    this.renderer.removeAttribute(pass, 'readonly');
  }

  onEnter(event){
    event.preventDefault()
    let element = event.srcElement.nextElementSibling; // get the sibling element
    if(element == null){
      return;
    }
    else
        element.focus();
    return false
  }

  displayMessage(email, password){
    if (password.length < 6) {
      return 'Enter at least 6 chars for password.'
    }
    if (!String(email).toLowerCase().match(EMAIL_REGEX) || password.length < 6) {
      return 'Please enter a valid email.'
    }
    else{
      return ''
    }  }

}
