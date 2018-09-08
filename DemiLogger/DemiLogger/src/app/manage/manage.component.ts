import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  announcement = 'No announcement.';
  newAnnouncement = 'newAnnouncent';

  constructor() { }

  ngOnInit() {
  }
  createAnnouncement()
  {
    this.announcement = this.newAnnouncement;
  }

  onNewAnnouncement(event: Event)
  {
    this.announcement = (<HTMLInputElement>event.target).value;
  }
}
