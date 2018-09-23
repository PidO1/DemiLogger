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
  routeManage(event) {
    this.token = jwt_decode(localStorage.getItem('token'));
    if (this.token.demi === 0) {
      this.router.navigate(['/manage']);
    }
  }
}
