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
    } else {
        this.token = jwt_decode(sessionStorage.getItem('token'));
        if (this.token.admin === 1) {
          this.router.navigate(['/manage']);
        } else if (this.token.admin === 0) {
          alert('Administrator permissions required.');
        }
    }
  }
}
