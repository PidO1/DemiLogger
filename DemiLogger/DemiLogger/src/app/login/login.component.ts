import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PgpdServiceService} from "../pgpd-service.service";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private submitService: PgpdServiceService) {}
  ngOnInit() {}
  // tokenDecode="";
  // token="";
  onSubmit(form: NgForm)
  {
    // console.log(form.value);

    this.submitService.storeLoginData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response._body);
          console.log(localStorage.setItem('token', response._body);
        },
        (error) => console.log(error)
      );
  }
}
