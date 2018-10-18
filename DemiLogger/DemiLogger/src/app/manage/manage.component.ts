import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PgpdServiceService } from '../pgpd-service.service';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
  pulled = '';

  AccountDate;
  AccountHolderSurname;
  AccountNR;
  AccountTypeInfo;
  AccountholderInitials;
  BankNAme;
  CorrespondencePref;
  DoB;
  Email;
  EmployPrevious;
  Extension;
  FullNames;
  Gender;
  HOmeLanguage;
  IDNumber;
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
  ResidentialAddress;
  Surname;
  TaxNumber;
  TelNumber;
  Title;
  ZipCode;
  accountType;
  branchCode;
  highestQualification;
  passportExpiryDate;
  permitExpiryDate;
  selfEmploy;
  workPermitNR;

  studentnumber;
  demiName;
  modulename;
  modulemark;

  constructor(private submitService: PgpdServiceService, private http: HttpClient) { }

  ngOnInit() {
  }
  onSubmitAnnouncement(form: NgForm) {
    console.log(form.value);
    this.submitService.storeAnnouncementData(form.value)
      .subscribe(
        (response) => {
          // @ts-ignore
          alert(response.message);
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
  }
  onSubmitLecturer(form: NgForm) {
    console.log(form.value);
    this.submitService.storeLecturerData(form.value)
      .subscribe(
        (response) => {
          // @ts-ignore
          alert(response.message);
        },
        (error) => {
          if (error != null){
            alert('Something went wrong or the connection timed out.');
          }
        }
      );
  }

  onSubmitLecturerModule(form: NgForm) {
    console.log(form.value);
    this.submitService.storeLecturerModule(form.value)
      .subscribe(
        (response) => {
          // @ts-ignore
          alert(response.message);
        },
        (error) => {
          if (error != null){
            alert('Something went wrong or the connection timed out.');
          }
        }
      );
  }

  onSubmitExistingAdmin(form: NgForm) {
    console.log(form.value);
    this.submitService.storeExistingAdminData(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          // @ts-ignore
          alert(response.message);
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong or the connection timed out.');
          }
        }
      );
  }

  onSubmitModule(form: NgForm) {
    console.log(form.value);
    this.submitService.storeAddModule(form.value)
      .subscribe(
        (response) => {
          alert('Module added.');
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
  }
  onGetStudentApplication() {
    this.submitService.getStudentInfo()
      .subscribe(
        (response) => {
          // @ts-ignore
          this.data = response;
          this.studentnumber = this.data[this.arr].NwuNumber;
          this.demiName = this.data[this.arr].demiName;
          this.modulename = this.data[this.arr].modulename;
          this.modulemark = this.data[this.arr].moduleMark;
          console.log(this.data);
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
  }
  onRadioSelected(event) {
    console.log(event);
    this.condition = event.target.id;
  }
  nextStudent() {
    if (this.condition === 'Yes') {
      this.submitService.getNextStudentAccept(this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        });
    } else if (this.condition === 'No') {
      this.submitService.getNextStudentDelete(this.data[this.arr])
        .subscribe(res => {
          console.log(res);
        });
    }
    this.arr++;
    if (this.arr >= this.data.length) {
      this.studentnumber = 'done';
      this.demiName = '';
      this.modulename = '';
      this.modulemark = '';
    }else {
      this.studentnumber = this.data[this.arr].NwuNumber;
      this.demiName = this.data[this.arr].demiName;
      this.modulename = this.data[this.arr].modulename;
      this.modulemark = this.data[this.arr].moduleMark;
    }

  }

  getStudentPDFInfo(form: NgForm) {
    const header = new HttpHeaders().set('Content-Type', 'application-json');
    console.log(form.value);
    this.submitService.getinfoForPDF(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.studentPDFData = response;
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
          this.AccountDate = this.studentPDFData.AccountDate;
          this.permitExpiryDate = this.studentPDFData.permitExpiryDate;
          this.workPermitNR = this.studentPDFData.workPermitNR;
          this.Email = this.studentPDFData.Email;
          this.AccountTypeInfo = this.studentPDFData.AccountTypeInfo;
          console.log(this.Title)
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
  }

  claimsHours;
  activity = 'Class assistance'
  day;
  month;
  year;
  hour;
  uur;
  minuut;
  Endhours;
  Endminuut;
  stnum;
  date = new Date();
  todayDate;

  stInfo;
  FullNames1;
  IDNumber1;
  Initials1;
  Surname1;
  Title1;
  passport;
  stNum;
  moduleCode;
  getStudentClaimsInfo(form: NgForm) {
    const header = new HttpHeaders().set('Content-Type', 'application-json');
    console.log(form.value);
    this.stNum = form.value.nwunumber5;
    this.moduleCode = form.value.module1;
    this.submitService.getClaimsInfoForPDF(form.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.stInfo = response;
          this.FullNames1 = this.stInfo[0].FullNames;
          this.IDNumber1 = this.stInfo[0].IDNumber;
          this.Initials1 = this.stInfo[0].Initials;
          this.Surname1 = this.stInfo[0].Surname;
          this.Title1 = this.stInfo[0].Title;
          this.passport = this.stInfo[0].passport;
          this.date.getDate();
          console.log(this.date);
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
    this.todayDate = this.date.toLocaleDateString();
    console.log(this.date.toLocaleDateString());
  }

  getHours(form: NgForm) {
    const header = new HttpHeaders().set('Content-Type', 'application-json');
    console.log(form.value);
    this.stnum = form.value.nwunumber5;
    this.submitService.getClaimsHours(form.value)
      .subscribe(
        (response) => {
          this.claimsHours = response;
          console.log(this.claimsHours);
          let arr = 0;
          while(this.claimsHours[arr] != null)
          {
            this.day = this.claimsHours[arr].dag;
            this.month = this.claimsHours[arr].maand;
            this.year = this.claimsHours[arr].jaar;
            this.hour = this.claimsHours[arr].hours;
            this.uur = this.claimsHours[arr].uur;
            this.minuut = this.claimsHours[arr].minuut;
            this.Endhours = this.claimsHours[arr].Endhours;
            this.Endminuut = this.claimsHours[arr].Endminuut;
            arr++;
          }
        },
        (error) => {
          console.log(error);
          if (error != null){
            alert('Something went wrong, make sure your data is correct or the connection may have timed out.');
          }
        }
      );
  }

  public generatePDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295; 
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(this.NwuNumber + '-AppointmentForm.pdf'); // Generated PDF
    });
  }
  public generateClaimsPDF() {
    const data = document.getElementById('contentToConvertClaims');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(this.stnum + '-ClaimsForm.pdf'); // Generated PDF
    });
  }
  activateButtons(event) {
    const el1 = <HTMLInputElement>document.getElementById('getImg1');
    el1.disabled = false;
    const el2 = <HTMLInputElement>document.getElementById('getImg2');
    el2.disabled = false;
    const el3 = <HTMLInputElement>document.getElementById('getImg3');
    el3.disabled = false;
    const el4 = <HTMLInputElement>document.getElementById('getImg4');
    el4.disabled = false;
    const el5 = <HTMLInputElement>document.getElementById('getImg5');
    el5.disabled = false;
    this.pulled = 'Images pulled, they may now be downlaoded.';
  }
  conn = 'http://192.168.1.7:3000';
  setNwuNumber(form: NgForm) {
    this.imgNumber = form.value.nwunumber4;
    console.log(this.imgNumber);
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
  getImageFromServiceID(event) {
    this.imgUrl = this.conn + '/image/getID/' + this.imgNumber;
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

  getImageFromServicePassPort(event) {
    this.imgUrl = this.conn + '/image/getPassport/' + this.imgNumber;
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
  getImageFromServiceProof(event) {
    this.imgUrl = this.conn + '/image/getReg/' + this.imgNumber;
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
  getImageFromServicePermit(event) {
    this.imgUrl = this.conn + '/image/getPermit/' + this.imgNumber;
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
  getImageFromServiceConduct(event) {
    this.imgUrl = this.conn + '/image/getCWork/' + this.imgNumber;
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
