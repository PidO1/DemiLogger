import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PgpdServiceService } from '../../pgpd-service.service';
import { Router } from '@angular/router';

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
            // @ts-ignore
            alert(response.message);
          },
            (error) => {
          console.log(error);
              if (error != null){
                alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
              }
            }
      );
  }

}
