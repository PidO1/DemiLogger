import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpHeaders} from "../../../../node_modules/@angular/common/http";
import { PgpdServiceService } from "../../pgpd-service.service";

@Component({
  selector: 'app-studantapplications',
  templateUrl: './studantapplications.component.html',
  styleUrls: ['./studantapplications.component.css']
})
export class StudantapplicationsComponent implements OnInit {
  data;
  studentnumber;
  demiName;
  modulemark;
  modulename;
  arr = 0;
  tableLabel;
  tableData = [];
  constructor(private submitService: PgpdServiceService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const header = new HttpHeaders().set('Content-Type', 'application-json');
    console.log(form.value);
    this.submitService.getLecStudentApp(form.value)
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
          if (response != null){
            alert('Heres your Demis.');
          }
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
