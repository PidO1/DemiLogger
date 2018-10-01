import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ApplicationFormComponent } from './forms/application-form/application-form.component';
import { RegisterComponent } from './login/register/register.component';
import { AboutComponent } from './about/about.component';
import { InfoComponent } from './info/info.component';
import { ManageComponent } from './manage/manage.component';
import {PgpdServiceService} from './pgpd-service.service';
import {Http, HttpModule} from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SaApplicationFormComponent } from './forms/sa-application-form/sa-application-form.component';
import { TokenInterceptor } from './token.interceptor';
import { ModuleapplicationComponent } from './forms/moduleapplication/moduleapplication.component';
import { DataTableModule } from "angular5-data-table";

const appRoutes: Routes = [
  { path: 'home', component:  HomeComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login/register', component:  RegisterComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'forms/sa-application-form', component: SaApplicationFormComponent},
  { path: 'forms/application-form', component: ApplicationFormComponent},
  { path: 'forms/moduleapplication', component: ModuleapplicationComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ApplicationFormComponent,
    RegisterComponent,
    AboutComponent,
    InfoComponent,
    ManageComponent,
    SaApplicationFormComponent,
    ModuleapplicationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    // DataTableModule.forRoot(),
    HttpModule
  ],
  providers: [
    PgpdServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
