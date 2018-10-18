import { Component, OnInit } from '@angular/core';
import { PgpdServiceService } from '../pgpd-service.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  announcement = [];
  announceFor = [];

  constructor(private submitService: PgpdServiceService) { }

  ngOnInit() {
    this.onGetAnnouncement();
  }
  onGetAnnouncement() {
    this.submitService.getAnnouncement()
      .subscribe(
        (response) => {
            // @ts-ignore
            if (response.announce1.demi === 1 && response.announce1.dosent === 1) {
              this.announceFor[0] = 'All';
              // @ts-ignore
            } else if (response.announce1.demi === 1 && response.announce1.dosent === 0) {
              this.announceFor[0] = `Demi's`;
            } else {
              this.announceFor[0] = 'Lecturers';
            }
            // @ts-ignore
            if (response.announce2.demi === 1 && response.announce2.dosent === 1) {
              this.announceFor[1] = 'All';
              // @ts-ignore
            } else if (response.announce2.demi === 1 && response.announce2.dosent === 0) {
              this.announceFor[1] = `Demi's`;
            } else {
              this.announceFor[1] = 'Lecturers';
            }
            // @ts-ignore
            if (response.announce3.demi === 1 && response.announce3.dosent === 1) {
              this.announceFor[2] = 'All';
              // @ts-ignore
            } else if (response.announce3.demi === 1 && response.announce3.dosent === 0) {
              this.announceFor[2] = `Demi's`;
            } else {
              this.announceFor[2] = 'Lecturers';
            }
            // @ts-ignore
            this.announcement[0] = (response.announce1.message);
            // @ts-ignore
            this.announcement[1] = (response.announce2.message);
            // @ts-ignore
            this.announcement[2] = (response.announce3.message);
            console.log(response);
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
