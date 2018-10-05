import { Observable } from 'rxjs';
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
  storeRegisterData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/user/register', formData, {headers: header});
  }
  storeAnnouncementData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://192.168.1.8:3000/anounce/make', formData, {headers: header});
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
  getImg(imgUrl: string): Observable<Blob> {
    return this.http.get(imgUrl, {responseType: 'blob'});
  }
}

