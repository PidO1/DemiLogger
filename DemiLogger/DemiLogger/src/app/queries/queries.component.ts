import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {
  data;
  arr = 0;

  constructor(private submitService: PgpdServiceService) { }

  ngOnInit() {
  }
  onSubmitAnnouncement(form: NgForm) {
    console.log(form.value);
    this.submitService.storeLecturerAnnouncementData(form.value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  onGetStudentData() {
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
}
