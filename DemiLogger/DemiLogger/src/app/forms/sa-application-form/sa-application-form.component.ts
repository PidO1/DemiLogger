import { Component, OnInit } from '@angular/core';
import {HttpClient} from "../../../../node_modules/@angular/common/http";

@Component({
  selector: 'app-sa-application-form',
  templateUrl: './sa-application-form.component.html',
  styleUrls: ['./sa-application-form.component.css']
})
export class SaApplicationFormComponent implements OnInit {
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

  selectedFile: File = null;
  selectedDataValue: string;
  selectedDataName: string;
  fd = new FormData();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onDataSelected(event)
  {
    console.log(event);
    this.selectedDataValue = event.target.value;
    this.selectedDataName = event.target.name;
    this.fd.append (this.selectedDataName, this.selectedDataValue);
  }

  onRadioSelected(event)
  {
    console.log(event);
    this.selectedDataValue = event.target.id;
    this.selectedDataName = event.target.name;
    this.fd.append (this.selectedDataName, this.selectedDataValue);
  }

  onFileSelected(event)
  {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('image', this.selectedFile, this.selectedFile.name);
  }

  onUpload()
  {
    this.http.post('http://192.168.1.8:3000/demi/applicationform', this.fd)
      .subscribe(res =>{
        console.log(res);
      })
  }
}
