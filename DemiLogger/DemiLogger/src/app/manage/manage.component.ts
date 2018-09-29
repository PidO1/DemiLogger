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

  // onGetStudentApplication()
  // {
  //   this.submitService.getStudentInfo()
  //     .subscribe(
  //       (response) => {
  //         // @ts-ignore
  //         this.data = response;
  //         console.log(this.data);
  //       },
  //       (error) => console.log(error)
  //     );
  // }

  toggleVisibility(e){
    this.marked= e.target.checked;
  }

  // selectedDataCheked: string;
  // selectedDataName: string;
  // fd = new FormData();
  //
  // onDataSelected(event)
  // {
  //   console.log(event);
  //   this.selectedDataCheked = event.target.checked;
  //   this.selectedDataName = event.target.name;
  //   this.fd.append (this.selectedDataName, this.selectedDataCheked);
  // }
  //
  // onUpload()
  // {
  //   this.fd.append('nwunumber', this.data.nwunumber);
  //   this.http.post('http://192.168.1.8:3000/', this.fd)
  //     .subscribe(res =>{
  //       console.log(res);
  //     })
  // }
}
