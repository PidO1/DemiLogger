import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  toets = [
    { data: [ 55555555, "Danie", "Coetzee", "b4kg4t@gmail.com" ], label: [ "Nwu-Number", "Name", "Surname", "Email" ] },
    { data: [ 55555555, "Danie", "Coetzee", "b4kg4t@gmail.com" ], label: [ "Nwu-Number", "Name", "Surname", "Email" ] },
    { data: [ 55555555, "Danie", "Coetzee", "b4kg4t@gmail.com" ], label: [ "Nwu-Number", "Name", "Surname", "Email" ] },
    { data: [ 55555555, "Danie", "Coetzee", "b4kg4t@gmail.com" ], label: [ "Nwu-Number", "Name", "Surname", "Email" ] },
    { data: [ 55555555, "Danie", "Coetzee", "b4kg4t@gmail.com" ], label: [ "Nwu-Number", "Name", "Surname", "Email" ] } ];



  data;
  studentnumber;
  demiName;
  modulemark;
  modulename;
  arr = 0;
  tableLabel;
  tableData = [];
  constructor(private submitService: PgpdServiceService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const header = new HttpHeaders().set('Content-Type', 'application-json');
    console.log(form.value);
    this.submitService.getLecStudentInfo(form.value)
        .subscribe(
            (response) => {
              this.data = response;
              console.log(this.data);
              this.tableLabel = this.data[0].label;
              let arr = 0;
              while(this.data[arr] != null)
              {
                this.tableData.push(this.data[arr]);
                arr++;
              }
              console.log(this.tableData);
              console.log(this.tableLabel);
        },
        (error) => console.log(error)
      );


  }
}
