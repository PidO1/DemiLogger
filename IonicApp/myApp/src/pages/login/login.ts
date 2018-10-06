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
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post('192.168.1.8:3000/user/login', this.userData, {headers: header})
    .subscribe(data => {
      console.log('my data: ', data);
    });
  }
}