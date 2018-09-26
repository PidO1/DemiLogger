import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PgpdServiceService } from "../pgpd-service.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  nwunumberjson: string = '';

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

  onGetStudentApplication()
  {
    this.submitService.getStudentInfo()
      .subscribe(
        (response: Response) => {
          const data = response.json();
          // for (const studentInfo of data)
          // {
          //   studentInfo.nwunumber = 'nwu' + studentInfo.nwunumber;
          //   studentInfo.password;
          //   console.log(studentInfo)
          // }
          console.log(data)
          this.nwunumberjson = data.nwunumber;
          console.log(this.nwunumberjson)
        },
        (error) => console.log(error)
      );
  }
}
