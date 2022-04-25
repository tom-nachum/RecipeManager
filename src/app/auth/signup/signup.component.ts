import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';
import { AuthResopnseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(private router: Router,     
    private authService: AuthService,
    private dialog: MatDialog,
    private renderer:Renderer2
    ) {}

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResopnseData>;
    authObservable = this.authService.signUp(email, password);
    authObservable.subscribe(
      (resData) => {
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
}
