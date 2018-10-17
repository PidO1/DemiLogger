import { PgpdServiceService } from './../../pgpd-service.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '../../../../node_modules/@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sa-application-form',
  templateUrl: './sa-application-form.component.html',
  styleUrls: ['./sa-application-form.component.css']
})
export class SaApplicationFormComponent implements OnInit {
  gender = ['male', 'female'];
  maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed'];
  correspondencePreference = ['English', 'Afrikaans'];
  race = ['African', 'Coloured', 'Indian', 'White', 'Other'];
  previouslyemployed = ['Yes', 'No'];
  otheremployer = ['Yes', 'No'];
  selfemployed = ['Yes', 'No'];
  accounttype = ['Current(cheque)', 'Savings', 'Transmission'];
  accountinfo = ['Own account', 'Joint account', '3rd party'];
  model;
  model1;
  model2;
  model3;

  selectedFile: File = null;
  selectedDataValue: string;
  selectedDataName: string;
  fd = new FormData();

  constructor(private http: HttpClient, private router: Router, private submitService: PgpdServiceService) {
  }

  ngOnInit() {
  }

  onDataSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.value;
    this.selectedDataName = event.target.name;
    if (this.fd.has(this.selectedDataName)) {
      this.fd.delete(this.selectedDataName);
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    } else {
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
  }

  onRadioSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.id;
    this.selectedDataName = event.target.name;
    if (this.fd.has(this.selectedDataName)) {
      this.fd.delete(this.selectedDataName);
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    } else {
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.id;
    this.selectedFile = <File>event.target.files[0];
    this.fd.append(this.selectedDataValue, this.selectedFile, this.selectedFile.name);
    if (this.fd.has(this.selectedDataValue)) {
      this.fd.delete(this.selectedDataValue);
      this.fd.append(this.selectedDataValue, this.selectedFile, this.selectedFile.name);
    } else {
      this.fd.append(this.selectedDataValue, this.selectedFile, this.selectedFile.name);
    }
  }

  public onUpload() {
    this.submitService.uploadSAForm(this.fd)
      .subscribe(res => {
          console.log(res);
          console.log(this.fd);
          // @ts-ignore
          if (res != null) {
            alert('Application recorded, please submit a module(s) application.');
            this.router.navigate(['/forms/moduleapplication']);
          }
        },
        (error) => {
          if (error != null) {
            console.log(error);
            alert('Something went wrong make sure your data is correct. Connection timed out or .');
          }
        }
      );
  }
}
