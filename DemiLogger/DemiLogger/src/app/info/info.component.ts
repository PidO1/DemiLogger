import { Component, OnInit } from '@angular/core';
import { PgpdServiceService } from "../pgpd-service.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  data;
  constructor(private  submitService: PgpdServiceService) { }
  ngOnInit() {
  }
  getAnn(){
    this.submitService.getAnnouncement()
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
