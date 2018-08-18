import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { AddButtonComponent } from '../add-button/add-button.component';
import { ButtonlistComponent } from '../buttonlist/buttonlist.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AuthGuardService } from '../user/auth-guard.service';
import { AuthenticationService } from '../user/authentication.service';
import { ButtonDataService } from '../button-data.service';
import { LoginComponent } from '../user/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from '../user/register/register.component';
import { LogoutComponent } from '../user/logout/logout.component';
import { ButtonpageComponent } from '../buttonpage/buttonpage.component';
import {ButtonResolver} from '../button/button.resolver.service'; 


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'buttonpage', component: ButtonpageComponent },
  { path: 'addButton', canActivate: [AuthGuardService], component: AddButtonComponent },
  { path: 'removeButton/:id', canActivate: [AuthGuardService], component: ButtonlistComponent, resolve: { button: ButtonResolver} },    
  { path: 'editButton/:id', canActivate: [AuthGuardService], component: AddButtonComponent, resolve: { button: ButtonResolver} },  
  { path: 'logout', component: LogoutComponent },
  { path: 'buttonlist', canActivate: [AuthGuardService], component: ButtonlistComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'buttonpage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    ButtonComponent,
    AddButtonComponent,
    ButtonlistComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ButtonpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [AuthenticationService, AuthGuardService, ButtonDataService, ButtonResolver],
  exports: [RouterModule]

})
export class AppRoutingModule { }
