import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonlistComponent } from './buttonlist/buttonlist.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ButtonDataService } from './button-data.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ButtonpageComponent } from './buttonpage/buttonpage.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MenuComponent,
    FooterComponent
  
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ButtonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
