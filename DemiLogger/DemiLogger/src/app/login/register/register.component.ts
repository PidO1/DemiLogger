import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Template-driven form used to capture entered data from user.
import { PgpdServiceService } from '../../pgpd-service.service'; // Enable sending data to this componant.
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //PgpdServicesServices componant is imported and inserted in the constructer
  // in order to send the data to the pgpd-services.services.ts componant.
  constructor(private submitService: PgpdServiceService, private router: Router) { }

  ngOnInit() {
  }

// The onSubmit method is used to send the form values to the pgpd-services.services.ts componant
// in order to send the data to the server back-end.
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.submitService.storeRegisterData(form.value) // All the form value is sent to the PgpdServiceService componant.
      .subscribe(
        (response) => {
          this.router.navigate(['/login']);
          // @ts-ignore
          alert(response.message);
        },
        (error) => {
          if (error != null){
            alert('Something went wrong or the connection timed out.');
          }
        }
        );
  }
}
