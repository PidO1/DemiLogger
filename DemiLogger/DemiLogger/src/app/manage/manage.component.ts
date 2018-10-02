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
  arr = 0;
  apply = ['Yes', 'No'];
  condition;
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
  onSubmitModule(form: NgForm) {
    console.log(form.value);
    this.submitService.storeAddModule(form.value)
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
    this.condition = event.target.id;
  }
  nextStudent() {
    if (this.condition === 'Yes') {
    this.http.post('http://192.168.1.8:3000/application/accept', this.data[this.arr])
          .subscribe(res => {
            console.log(res);
          })
    }
    else if(this.condition === 'No'){
      this.http.post('http://192.168.1.8:3000/application/delete', this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        })
    }
    this.arr++;
  }
}
