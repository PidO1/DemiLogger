import { HeaderComponent } from './../header/header.component';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PgpdServiceService} from '../pgpd-service.service';
import { Router, RouterModule } from '@angular/router';
// import { AppComponent } from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public ann;
  constructor(private submitService: PgpdServiceService,
              private enableButton: HeaderComponent,
              private router: Router){}

  ngOnInit() {}
  onSubmit(form: NgForm) {
    this.submitService.storeLoginData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          if (sessionStorage.length < 0) {
            // @ts-ignore
            sessionStorage.setItem('token', response.body);
            this.router.navigate(['/home']);
          } else {
            sessionStorage.clear();
            // @ts-ignore
            sessionStorage.setItem('token', response.body);
            this.router.navigate(['/home']);
          }
        },
        (error) => console.log(error)
      );
  }
  // getAnnouncement(){
  //   this.submitService.getAnnouncement()
  //     .subscribe(
  //       (response) => {
  //       this.ann = response;
  //       console.log(this.ann);
  //       return this.ann},
  //     (error) => console.log(error));
  // }
}
