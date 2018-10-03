import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PgpdServiceService } from '../pgpd-service.service';
<<<<<<< HEAD
import {HttpClient} from '../../../node_modules/@angular/common/http';
import { saveAs } from 'file-saver';
=======
import {HttpClient, HttpHeaders} from '../../../node_modules/@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import * as jsPDF from 'jspdf';
>>>>>>> website-formatting-(continued)

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  providers:[PgpdServiceService]
})
export class ManageComponent implements OnInit {
  data;
  arr = 0;
  apply = ['Yes', 'No'];
  condition;
<<<<<<< HEAD

  constructor(private submitService: PgpdServiceService, private http: HttpClient) {
  }
=======
  token = {};
  theForm;
  nwuNumber = {};
  heading = 'test';
  constructor(private submitService: PgpdServiceService, private http: HttpClient) { }
>>>>>>> website-formatting-(continued)

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
<<<<<<< HEAD
      this.http.post('http://192.168.1.8:3000/application/accept', this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        })
    }
    else if (this.condition === 'No') {
=======
    this.http.post('http://192.168.1.8:3000/application/accept', this.data[this.arr])
          .subscribe(res => {
            console.log(res);
          });
    } else if (this.condition === 'No'){
>>>>>>> website-formatting-(continued)
      this.http.post('http://192.168.1.8:3000/application/delete', this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        });
    }
    this.arr++;
  }
<<<<<<< HEAD
  foto;
  // getID() {
  //   this.submitService.getID()
  //     .subscribe(
  //       (response) => {
  //         // @ts-ignore
  //         this.foto = response;
  //         console.log(this.foto);
  //       },
  //       (error) => console.log(error)
  //     );
  // }

  download(index){
    var filename = index;
    this.submitService.getID(filename)
      .subscribe(
        data1 => saveAs(data1),
        error => console.error(error)
      );
  }

=======
  getForm(form: NgForm) {
    if (sessionStorage.length === 0) {
      alert('Please login.');
    } else {
        this.token = jwt_decode(sessionStorage.getItem('token'));
        // @ts-ignore
      if (this.token.admin === 1) {
        const header = new HttpHeaders().set('Content-Type', 'application/json');
        this.http.post('http://192.168.1.8:3000/demi/demiGet', form.value, {headers: header})
          .subscribe(
            (response) => {
              // @ts-ignore
              this.theForm = response;
              console.log(this.theForm.NwuNumber);
          },
            (error) => console.log(error)
        );
        } else {
        // @ts-ignore
        if (this.token.admin === 0) {
          alert('Administrator permissions required.');
        }
      }
    }
  }
>>>>>>> website-formatting-(continued)
}
