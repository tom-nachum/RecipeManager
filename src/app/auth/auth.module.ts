import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AuthRoutingModule, 
    FormsModule, 
    SharedModule,
    FlexModule,
    FlexLayoutModule
  ],
})
export class AuthModule {}
