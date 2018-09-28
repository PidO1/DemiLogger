import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) { }
  token = {};
  setCss = false;
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
      this.router.navigate(['/queries']);
    }
  }
  routeForm(event) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
      this.router.navigate(['/form']);
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
