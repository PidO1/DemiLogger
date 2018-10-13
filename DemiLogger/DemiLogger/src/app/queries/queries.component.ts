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
  tableLabel = [9,9,9,9,9,9,9,9,9];
  tableData = [[]];
  dataArr = [];

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
              // console.log(this.data);
              // for(let j = 0; j < this.data.length; j++)
              // {
              //   for(let i = 0; i < this.data[j].data.length; i++)
              //   {
              //     this.dataArr.push(this.data[j].data[i]);
              //   }
              //   let _tableData: Array<any> = [{data: this.dataArr, label: j}];
              // }
              //
              // for(let i = 0; i < this.data; i++)
              // {
              //   this.tableLabel.push(this.toets[0])
              // }

          // @ts-ignore
          // this.studentnumber = this.data[this.arr].NwuNumber;
          // this.demiName = this.data[this.arr].demiName;
          // this.modulename = this.data[this.arr].modulename;
          // this.modulemark = this.data[this.arr].moduleMark;
        },
        (error) => console.log(error)
      );
  }
}
