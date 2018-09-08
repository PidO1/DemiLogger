import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // defaultQuestion = 'pet';
  // answer = '';
  // gender = ['male', 'female'];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: ngForm)
  {
    console.log(form);
  }

}
