import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
import { RegisterComponent } from './login/register/register.component';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './info/info.component';
import { QueriesComponent } from './queries/queries.component';
import { ManageComponent } from './manage/manage.component';
import {PgpdServiceService} from "./pgpd-service.service";
import {Http, HttpModule} from "@angular/http";


const appRoutes: Routes = [
  { path: 'home', component:  HomeComponent },
  { path: 'form', component:  ApplicationFormComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login/register', component:  RegisterComponent },
  { path: 'queries', component: QueriesComponent },
  { path: 'manage', component: ManageComponent },
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
    QueriesComponent,
    ManageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [PgpdServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
