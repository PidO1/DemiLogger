import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {PgpdServiceService} from "../../pgpd-service.service";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  gender = ['male', 'female'];
  maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
  correspondancePreference = ['English', 'Afrikaans'];
  race = ['African', 'Coloured', 'Indian', 'White', 'Other'];
  previouslyemployed = ['Yes', 'No'];
  otheremployer = ['Yes', 'No'];
  selfemployed = ['Yes', 'No'];
  accounttype = ['Current(cheque)', 'Savings', 'Transmission'];
  accountinfo = ['Own account', 'Joint account', '3rd party'];

  constructor(private submitService: PgpdServiceService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm)
  {
    console.log(form.value);
    this.submitService.storeApplicationFormData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

}
