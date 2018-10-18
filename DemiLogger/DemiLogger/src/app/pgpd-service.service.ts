import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PgpdServiceService {
  comm = 'http://192.168.1.7:3000'
  constructor(private http: HttpClient) {}

  // Register and Login Posts.
  storeLoginData(loginData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.comm + '/user/login', loginData, {headers: header});
  }
  storeRegisterData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/user/register', formData, {headers: header});
  }

  //Manage componant's gets and posts
  storeAnnouncementData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/anounce/make', formData, {headers: header});
  }
  storeLecturerData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/dosente/register', formData, {headers: header});
  }

  storeLecturerModule(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/dosente/assign/module', formData, {headers: header});
  }

  storeExistingAdminData(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/user/assign/admin', formData, {headers: header});
  }

  storeAddModule(formData: any[]) {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.comm + '/subjects/', formData, {headers: header});
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
  storeModuleData(moduleData: any[]) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.comm + '/application/module', moduleData, {headers: header});
  }
  getStudentInfo() {
    return this.http.get(this.comm + '/demi/all');
  }
  getAnnouncement() {
    return this.http.get(this.comm + '/anounce/get');
  }
  getImg(imgUrl: string): Observable<Blob> {
    return this.http.get(imgUrl, {responseType: 'blob'});
  }
  getNextStudentAccept(value) {
    return this.http.post(this.comm + '/application/accept', value);
  }
  getLecStudentInfo(value) {
    return this.http.post(this.comm + '/dosente/get/dosent/demi', value);
  }
  getLecStudentApp(value) {
    return this.http.post(this.comm + '/application/get/applicants', value);
  }

  getNextStudentDelete(value) {
    return this.http.post(this.comm + '/application/delete', value);
  }
  getinfoForPDF(value) {
    return this.http.post(this.comm + '/demi/demiGet', value);
  }
  getClaimsInfoForPDF(value) {
    return this.http.post(this.comm + '/hours/getdetails', value);
  }
  getClaimsHours(value) {
    return this.http.post(this.comm + '/hours/get', value);
  }
  uploadSAForm(value) {
    return this.http.post(this.comm + '/demi/applicationform/sa', value);
  }
  uploadForeignForm(value) {
    return this.http.post(this.comm + '/demi/applicationform/foreign', value);
  }
}

