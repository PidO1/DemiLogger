import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PgpdServiceService} from "../pgpd-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // defaultQuestion = 'pet';
  // answer = '';
  // gender = ['male', 'female'];

  constructor(private submitService: PgpdServiceService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    console.log(form.value);
    this.submitService.storeLoginData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
