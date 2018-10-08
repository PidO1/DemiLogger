import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(public navCtrl: NavController, public http: HttpClient) {
  }
  userData = {}
  logForm() {
    console.log(this.userData)
    // const header = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post('https://ionic-post-test.firebaseio.com/data.json', this.userData)
    .subscribe(data => {
      console.log('my data: ', data);
    },
    (error) => console.log(error));
  }
}