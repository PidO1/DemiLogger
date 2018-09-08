import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PgpdServiceService {

  constructor(private http: Http) { }

  storeLoginData(loginData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://udemy-ng-http-d1134.firebaseio.com/login.json', loginData, {headers: header})
  }
  storeApplicationFormData(formData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://udemy-ng-http-d1134.firebaseio.com/form.json', formData, {headers: header})
  }
}
