import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";
import {HttpClient} from "../../../node_modules/@angular/common/http";
import { DataTableResource } from 'angular5-data-table';
import { DataTable } from "angular5-data-table";
// import { DataTableModule } from "angular5-data-table";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  data;

  constructor(private submitService: PgpdServiceService, private http: HttpClient) {
    this.itemResource.count().then(count => this.itemCount = count);
  }

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

  onSubmitModule(form: NgForm)
  {
    console.log(form.value);
    this.submitService.storeAddModule(form.value)
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

  itemResource = this.data;
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];


  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:
  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) {
    return item.jobTitle;
  }
}
