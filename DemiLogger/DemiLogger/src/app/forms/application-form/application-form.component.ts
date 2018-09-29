import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PgpdServiceService} from '../../pgpd-service.service';
import { HttpClient } from '@angular/common/http';
import {Data} from '@angular/router';

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
  model;
  model1;
  model2;
  model3;
  minDate = {year: 1940, month: 1, day: 1};

  selectedFile: File = null;
  selectedDataValue: string;
  selectedDataName: string;
  fd = new FormData();

  constructor(private http: HttpClient) {}
  // constructor(private submitService: PgpdServiceService) { }

  onDataSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.value;
    this.selectedDataName = event.target.name;
    this.fd.append (this.selectedDataName, this.selectedDataValue);
  }

  onRadioSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.id;
    this.selectedDataName = event.target.name;
    this.fd.append (this.selectedDataName, this.selectedDataValue);
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('image', this.selectedFile, this.selectedFile.name);
  }

  onUpload() {
    this.http.post('http://192.168.1.8:3000/demi/applicationform/foreign', this.fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {
  }
}
