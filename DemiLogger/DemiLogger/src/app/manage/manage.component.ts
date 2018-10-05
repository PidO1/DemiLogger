import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PgpdServiceService } from '../pgpd-service.service';
import {HttpClient, HttpHeaders} from '../../../node_modules/@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import * as jsPDF from 'jspdf';
import * as jspdf from 'jspdf';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  data;
  studentPDFData;
  arr = 0;
  apply = ['Yes', 'No'];
  condition;
  token = {};
  theForm;
  nwuNumber = {};
  heading = 'test';
  foto;
  imgUrl;
  imgNumber;
  imageToShow: any;


  //AccountDate = ;
  AccountHolderSurname;
  AccountNR;
  AccountTypeInfo;
  AccountholderInitials;
  BankNAme;
  CorrespondencePref;
// DemiId: 10
  DoB;
  Email;
  EmployPrevious;
  Extension;
  FullNames;
  Gender;
  HOmeLanguage;
  IDNumber;
// IDdoc: "uploads\ID.png"
// IDdocName: null
  Initials;
  InternalBox;
  MaidenName;
  MaritalStatus;
  MobileNumber;
  NWUprevious;
  Nationaity;
  NwuNumber;
  PaspportNR;
  PostAddress;
  PrefferedName;
  Race;
// RegistrationForm: "uploads\RegistrationForm.png"
// RegistrationFormName: null
  ResidentialAddress;
  Surname;
  TaxNumber;
  TelNumber;
  Title;
  ZipCode;
  accountType;
  branchCode;
// demi: 0
  highestQualification;
// module1: null
// module2: null
// module3: null
// modulemark1: null
// modulemark2: null
// modulemark3: null
// passport: "N/A"
  passportExpiryDate;
// passportName: null
// pasword: null
// permissionToConductWork: "N/A"
// permissionToConductWorkName: null
// permitExpiryDate: "N/A"
  selfEmploy;
// studyPermit: "N/A"
// studyPermitName: null
// workPe





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
          });
    } else if (this.condition === 'No') {
      this.http.post('http://192.168.1.8:3000/application/delete', this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        });
    }
    this.arr++;
  }

  getStudentPDFInfo(form: NgForm){
    const header = new HttpHeaders().set('Content-Type','application-json');
    console.log(form.value)
    this.http.post('http://192.168.1.8:3000/demi/demiGet', form.value)
      .subscribe(
        (response) => {
          this.studentPDFData = response;
          console.log(response)
          this.NwuNumber = this.studentPDFData.NwuNumber;
          this.Title = this.studentPDFData.Title;
          this.Surname = this.studentPDFData.Surname;
          this.Initials = this.studentPDFData.Initials;
          this.FullNames = this.studentPDFData.FullNames;
          this.PrefferedName = this.studentPDFData.PrefferedName;
          this.Extension = this.studentPDFData.Extension;
          this.InternalBox = this.studentPDFData.InternalBox;
          this.Gender = this.studentPDFData.Gender;
          this.MaritalStatus = this.studentPDFData.MaritalStatus;
          this.MaidenName = this.studentPDFData.MaidenName;
          this.CorrespondencePref = this.studentPDFData.CorrespondencePref;
          this.Race = this.studentPDFData.Race;
          this.DoB = this.studentPDFData.DoB;
          this.HOmeLanguage = this.studentPDFData.HOmeLanguage;
          this.Nationaity = this.studentPDFData.Nationaity;
          this.IDNumber = this.studentPDFData.IDNumber;
          this.PaspportNR = this.studentPDFData.PaspportNR;
          this.passportExpiryDate = this.studentPDFData.passportExpiryDate;
          this.TaxNumber = this.studentPDFData.TaxNumber;
          this.ResidentialAddress = this.studentPDFData.ResidentialAddress;
          this.PostAddress = this.studentPDFData.PostAddress;
          this.ZipCode = this.studentPDFData.ZipCode;
          this.TelNumber = this.studentPDFData.TelNumber;
          this.MobileNumber = this.studentPDFData.MobileNumber;
          this.EmployPrevious = this.studentPDFData.EmployPrevious;
          this.NWUprevious = this.studentPDFData.NWUprevious;
          this.selfEmploy = this.studentPDFData.selfEmploy;
          this.highestQualification = this.studentPDFData.highestQualification;
          this.accountType = this.studentPDFData.accountType;
          this.branchCode = this.studentPDFData.branchCode;
          this.AccountNR = this.studentPDFData.AccountNR;
          this.BankNAme = this.studentPDFData.BankNAme;
          this.AccountHolderSurname = this.studentPDFData.AccountHolderSurname;
          this.AccountholderInitials = this.studentPDFData.AccountholderInitials;
          console.log(this.Title)
        },
        (error) => console.log(error)
      );
  }

  public generatePDF()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.imageToShow = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
   }
   getImageFromServiceID(r) {
    console.log(r.nwunumber1);
    this.imgNumber = r.nwunumber1;
    this.imgUrl = 'http://192.168.1.8:3000/image/getID/' + this.imgNumber;
    this.submitService.getImg(this.imgUrl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        saveAs(data, this.imgNumber + ', ID');
    },
      error => {
      console.log(error.status);
      if (error.status === 404) {
        alert('No image for NWU number, Ensure the number is correct');
      }
    });
  }
  getImageFromServicePassPort(w) {
    console.log(w.nwunumber1);
    this.imgNumber = w.nwunumber1;
    this.imgUrl = 'http://192.168.1.8:3000/image/getPassport/' + this.imgNumber;
    this.submitService.getImg(this.imgUrl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        saveAs(data, this.imgNumber + ', Passport');
    },
      error => {
      console.log(error.status);
      if (error.status === 404) {
        alert('No image for NWU number, Ensure the number is correct');
      }
    });
  }
  getImageFromServiceProof(e) {
    console.log(e.nwunumber1);
    this.imgNumber = e.nwunumber1;
    this.imgUrl = 'http://192.168.1.8:3000/image/getReg/' + this.imgNumber;
    this.submitService.getImg(this.imgUrl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        saveAs(data, this.imgNumber + ', ProofOfRegistration');
    },
      error => {
      console.log(error.status);
      if (error.status === 404) {
        alert('No image for NWU number, Ensure the number is correct');
      }
    });
  }
  getImageFromServicePermit(t) {
    console.log(t.nwunumber1);
    this.imgNumber = t.nwunumber1;
    this.imgUrl = 'http://192.168.1.8:3000/image/getPermit/' + this.imgNumber;
    this.submitService.getImg(this.imgUrl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        saveAs(data, this.imgNumber + ', StudyPermit');
    },
      error => {
      console.log(error.status);
      if (error.status === 404) {
        alert('No image for NWU number, Ensure the number is correct');
      }
    });
  }
  getImageFromServiceConduct(y) {
    console.log(y.nwunumber1);
    this.imgNumber = y.nwunumber1;
    this.imgUrl = 'http://192.168.1.8:3000/image/getCWork/' + this.imgNumber;
    this.submitService.getImg(this.imgUrl)
      .subscribe(data => {
        this.createImageFromBlob(data);
        saveAs(data, this.imgNumber + ', ConductWork');
    },
      error => {
      console.log(error.status);
      if (error.status === 404) {
        alert('No image for NWU number, Ensure the number is correct');
      }
    });
  }
}
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
  // download(index) {
  //   const filename = index;
  //   this.submitService.getID(filename)
  //     .subscribe(
  //       data1 => saveAs(data1, filename),
  //       error => console.error(error)
  //     );
  // }
