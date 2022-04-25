import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { AuthService, AuthResopnseData } from '../auth.service';

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
  ) {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResopnseData>;
    authObservable = this.authService.signIn(email, password);
    authObservable.subscribe(
      (resData) => {
        this.router.navigate(['/recipes']);
      },
      (errorMessage:string) => {
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
}
