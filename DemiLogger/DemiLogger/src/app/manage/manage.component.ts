import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PgpdServiceService } from '../pgpd-service.service';
import {HttpClient} from '../../../node_modules/@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  data;
  theCheckbox = false;
  marked = false;
  arr = 0;
  apply = ['Yes', 'No'];
  selectedDataValue: string;
  selectedDataName: string;
  fd = new FormData();
  constructor(private submitService: PgpdServiceService, private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmitAnnouncement(form: NgForm) {
    console.log(form.value);
    this.submitService.storeAnnouncementData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onSubmitLecturer(form: NgForm) {
    console.log(form.value);
    this.submitService.storeLecturerData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onGetStudentApplication() {
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
  nextStudent() {
    this.selectedDataValue = this.data[this.arr].NwuNumber;
    this.selectedDataName = 'NwuNumber';
    if (this.fd.has(this.selectedDataName)) {
      this.fd.delete(this.selectedDataName);
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    } else {
      this.fd.append(this.selectedDataName, this.selectedDataValue);
    }
    this.arr++;
  }
}
