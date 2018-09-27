import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PgpdServiceService} from '../pgpd-service.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private submitService: PgpdServiceService, private enableButton: HeaderComponent) {}
  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.submitService.storeLoginData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('token', response._body);
        },
        (error) => console.log(error)
      );
  }
}
