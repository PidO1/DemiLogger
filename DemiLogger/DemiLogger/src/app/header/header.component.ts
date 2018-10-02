import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) { }
  token = {};
  setCss = false;

  studentSA(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/forms/sa-application-form']);
    }
  }
  studentFO(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/forms/application-form']);
    }
  }
  moduleApp(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/forms/moduleapplication']);
    }
  }
  routeAbout(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/about']);
    }
  }
  routeQueries(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
        this.token = jwt_decode(sessionStorage.getItem('token'));
        // @ts-ignore
      if (this.token.dosent === 1) {
          this.router.navigate(['/queries']);
        } else {
        // @ts-ignore
        if (this.token.dosent === 0) {
          alert('Lecturer permissions required.');
        }
      }
    }
  }
  routeInfo(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/info']);
    }
  }
  routeLogin(event) {
    if (sessionStorage.length === 1) {
      alert('Already logged in.');
    } else {
      this.router.navigate(['/login']);
    }
  }
  routeManage(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
        this.token = jwt_decode(sessionStorage.getItem('token'));
        // @ts-ignore
      if (this.token.admin === 1) {
          this.router.navigate(['/manage']);
        } else {
        // @ts-ignore
        if (this.token.admin === 0) {
          alert('Administrator permissions required.');
        }
      }
    }
  }
}
