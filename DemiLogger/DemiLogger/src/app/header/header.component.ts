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
  routeLogin(event) {
    if (sessionStorage.length === 1) {
      alert('Already logged in.');
    } else {
      this.router.navigate(['/login']);
    }
  }
  routeManage(event) {
    if (sessionStorage.length === 0) {
      alert('Please log in.');
    } else if (sessionStorage.length === 1) {
        this.token = jwt_decode(sessionStorage.getItem('token'));
        if (this.token.demi === 0) {
          alert('Administrator permissions required.');
        } else {
          this.router.navigate(['/manage']);
        }
    }
  }
}
