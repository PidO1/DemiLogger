import { Component } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';
  age;
  found: boolean;
  nameTyped = '';
  ageTyped: number;
  posted: boolean;

  constructor(private httpClient: HttpClient) {}

  onNameKeyUp(event: any) {
    this.name = event.target.value;
    this.found = false;
  }
  onNameTyped(event: any) {
    this.nameTyped = event.target.value;
    this.posted = false;
    // console.log(this.nameTyped);
  }
  onAgeTyped(event: any) {
    this.ageTyped = event.target.value;
    this.posted = false;
    // console.log(this.ageTyped);
  }
  getProfile() {
    let params = new HttpParams();
    params = params.append('name', this.name);
    this.httpClient.get('https://my-json-server.typicode.com/EdwardAdriaan/data/profiles/', {params})
      .subscribe(
        (data: any[]) => {
          if (data.length) {
            this.age = data[0].age;
            this.found = true;
          }
        }
      );
  }
  postProfile() {
    this.httpClient.post('https://my-json-server.typicode.com/EdwardAdriaan/data/profiles/',
      {
        name: this.nameTyped,
        age: this.ageTyped
      })
      .subscribe(
        (data: any) => {
          this.posted = true;
          console.log(data);
        });
  }
}
