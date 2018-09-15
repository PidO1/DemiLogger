import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {


  constructor(private submitService: PgpdServiceService) { }

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
}
