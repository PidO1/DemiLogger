import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PgpdServiceService } from "../../pgpd-service.service";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-moduleapplication',
  templateUrl: './moduleapplication.component.html',
  styleUrls: ['./moduleapplication.component.css']
})
export class ModuleapplicationComponent implements OnInit {

  constructor(private submitService: PgpdServiceService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.submitService.storeModuleData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          if (sessionStorage.length < 0) {
            // @ts-ignore
            sessionStorage.setItem('token', response.body);
            // this.router.navigate(['/home']);
          } else {
            sessionStorage.clear();
            // @ts-ignore
            sessionStorage.setItem('token', response.body);
            // this.router.navigate(['/home']);
          }
        },
        (error) => console.log(error)
      );
  }

}
