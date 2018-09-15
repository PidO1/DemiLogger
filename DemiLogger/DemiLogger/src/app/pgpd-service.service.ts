import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class PgpdServiceService {

  constructor(private http: Http) { }

  storeLoginData(loginData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/login', loginData, {headers: header})
  }

  storeApplicationFormData(formData: any[]) {
    const header = new Headers({'Content-Type': 'multipart/form-data'});
    return this.http.post('http://192.168.1.8:3000/demi/applicationform', formData, {headers: header})
  }

  storeRegisterData(formData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/register', formData, {headers: header})
  }
  storeAnnouncementData(formData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/announcment', formData, {headers: header})
  }
  storeLecturerData(formData: any[]) {
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/lecturer', formData, {headers: header})
  }
}
