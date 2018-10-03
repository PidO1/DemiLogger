import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AppComponent } from "./app.component";
// import 'rxjs/Rx';
// import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PgpdServiceService {

  constructor(private http: HttpClient) {
  }

  storeLoginData(loginData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://192.168.1.8:3000/user/login', loginData, {headers: header});
  }

  // storeInfo(loginData: any[]) {
  //   const header = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.post('http://192.168.1.8:3000/image/getID/27678825', loginData, {headers: header});
  // }

  storeRegisterData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/user/register', formData, {headers: header});
  }

  storeAnnouncementData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/announcment', formData, {headers: header});
  }

  storeLecturerAnnouncementData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/announcment', formData, {headers: header});
  }

  storeLecturerData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/dosente/register', formData, {headers: header});
  }

  storeAddModule(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/subjects/', formData, {headers: header});
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  storeModuleData(moduleData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://192.168.1.8:3000/application/module', moduleData, {headers: header});
  }

  getStudentInfo() {
    return this.http.get('http://192.168.1.8:3000/demi/all');
  }

  getAnnouncement() {
    return this.http.get('http://192.168.1.8:3000/anounce/get');
  }
  getID(file:String) {
    var body = {filename:file};

    return this.http.post('http://192.168.1.8:3000/image/getID/27678825', body,{
      responseType:'blob',
      headers:new HttpHeaders().append('Content-Type','application.json')
    });
  }
}

