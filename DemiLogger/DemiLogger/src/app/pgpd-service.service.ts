import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PgpdServiceService {

  constructor(private http: HttpClient) {}

  storeLoginData(loginData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://192.168.1.8:3000/user/login', loginData, {headers: header});
  }

  storeApplicationFormData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    return this.http.post('http://192.168.1.8:3000/demi/applicationform', formData, {headers: header});
  }

  storeRegisterData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/register', formData, {headers: header});
  }

  storeAnnouncementData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/demi/announcment', formData, {headers: header});
  }

  storeLecturerData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/dosente/register', formData, {headers: header});
  }

  storeStudentApproval(formData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://demi-371a7.firebaseio.com/data.json', formData, {headers: header});
  }
  // http://192.168.1.8:3000/demi/lecturer
  getToken() {
    return sessionStorage.getItem('token');
  }

  storeModuleData(moduleData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('https://demi-371a7.firebaseio.com/data.json', moduleData, {headers: header});
  }

  getStudentInfo()
  {
    return this.http.get('http://192.168.1.8:3000/demi/all');
  }
}

