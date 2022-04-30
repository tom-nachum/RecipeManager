import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { AuthService, AuthResopnseData } from '../auth.service';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (form.invalid) {
      this.errorHandler(this.invalidForm(email, password))
      return
    }
    let authObservable: Observable<AuthResopnseData>;
    authObservable = this.authService.signIn(email, password);
    authObservable.subscribe(
      (resData) => {
        this.router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        this.errorHandler(errorMessage);
      }
    );
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

  moveToSignUp() {
    this.router.navigate(['/auth', 'signup']);
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

  invalidForm(email, password) {
    if (password.length < 6) {
      return 'Password must be at least 6 characters.'
    }
    if (!String(email).toLowerCase().match(EMAIL_REGEX) || password.length < 6) {
      return 'Email or password is not correct.'
    }
    else{
      return ''
    }
  }
}
