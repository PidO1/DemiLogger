import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";
import {HttpClient} from "../../../node_modules/@angular/common/http";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  data;
  theCheckbox = false;
  marked = false;
  constructor(private submitService: PgpdServiceService, private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmitAnnouncement(form: NgForm)
  {
    console.log(form.value);
    this.submitService.storeAnnouncementData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onSubmitLecturer(form: NgForm)
  {
    console.log(form.value);
    this.submitService.storeLecturerData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
   arr = 0;
  onGetStudentApplication()
  {
    this.submitService.getStudentInfo()
      .subscribe(
        (response) => {
          // @ts-ignore
          this.data = response;
          console.log(this.data);
        },
        (error) => console.log(error)
      );
  }
  apply = ['Yes', 'No'];
  selectedDataValue: string;
  selectedDataName: string;
  fd = new FormData();
  onRadioSelected(event) {
    console.log(event);
    this.selectedDataValue = event.target.id;
    this.selectedDataName = event.target.name;
    if (this.fd.has(this.selectedDataName)) {
      this.fd.delete(this.selectedDataName);
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
    else {
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
  }
  nextStudent(){
    this.selectedDataValue = this.data[this.arr].NwuNumber;
    this.selectedDataName = "NwuNumber";
    if (this.fd.has(this.selectedDataName)) {
      this.fd.delete(this.selectedDataName);
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
    else {
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
    this.arr++;
  }

  toggleVisibility(e){
    this.marked= e.target.checked;
  }

  // CreateTableFromJSON() {
  //   // EXTRACT VALUE FOR HTML HEADER.
  //   // ('Book ID', 'Book Name', 'Category' and 'Price')
  //   var col = [];
  //   for (var i = 0; i < this.data.length; i++) {
  //     for (var key in this.data[i]) {
  //       if (col.indexOf(key) === -1) {
  //         col.push(key);
  //       }
  //     }
  //   }
  //
  //   // CREATE DYNAMIC TABLE.
  //   var table = document.createElement("table");
  //
  //   // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
  //
  //   var tr = table.insertRow(-1);                   // TABLE ROW.
  //
  //   for (var i = 0; i < col.length; i++) {
  //     var th = document.createElement("th");      // TABLE HEADER.
  //     th.innerHTML = col[i];
  //     tr.appendChild(th);
  //   }
  //
  //   // ADD JSON DATA TO THE TABLE AS ROWS.
  //   for (var i = 0; i < this.data.length; i++) {
  //
  //     tr = table.insertRow(-1);
  //
  //     for (var j = 0; j < col.length; j++) {
  //       var tabCell = tr.insertCell(-1);
  //       tabCell.innerHTML = this.data[i][col[j]];
  //     }
  //   }
  //
  //   // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  //   var divContainer = document.getElementById("showData");
  //   divContainer.innerHTML = "";
  //   divContainer.appendChild(table);
  // }


}
