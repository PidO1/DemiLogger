import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PgpdServiceService} from '../pgpd-service.service';
import { Router, RouterModule } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private submitService: PgpdServiceService, private enableButton: HeaderComponent, private router: Router) {}
  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.submitService.storeLoginData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          if (sessionStorage.length < 0) {
            sessionStorage.setItem('token', response._body);
            this.router.navigate(['/home']);
          } else {
            sessionStorage.clear();
            sessionStorage.setItem('token', response._body);
            this.router.navigate(['/home']);
          }
        },
        (error) => console.log(error)
      );
  }
}
