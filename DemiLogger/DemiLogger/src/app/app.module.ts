import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
import { RegisterComponent } from './login/register/register.component';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './info/info.component';


const appRoutes: Routes = [
  { path: 'home', component:  HomeComponent },
  { path: 'form', component:  ApplicationFormComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login/register', component:  RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FormsComponent,
    ApplicationFormComponent,
    RegisterComponent,
    AboutComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
