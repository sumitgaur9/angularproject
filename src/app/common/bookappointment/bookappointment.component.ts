import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import { AppEnum } from 'src/app/shared/app.enum';

import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  public appointmentTypeData = [{ "name": "HomeVisit" }, { "name": "Online" }]
  public patientListData:any=[];

  public  completeTimeSlotDataArray = [];

  public  filterTimeSlotDataArray = [];

  public visiblePatientNameSelect: boolean = false;
  public doctorWiseAppointmentData:any=[];
  public completeDoctorWiseAppointmentData:any=[];
  public availableSlotData:any=[];
  public disableAvailableTimeSlotBtn:boolean=true;

  public bookAppointmentForm = new FormGroup({
    patientNname: new FormControl(""),
    patientEmail: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    patientMob: new FormControl(""),
    patientAddres: new FormControl(""),
    patientPIN: new FormControl(""),
    disease: new FormControl(""),
    diseaseAge: new FormControl(""),
    doctorID: new FormControl(""),
    doctorName: new FormControl(""),
    appointmentDate: new FormControl({ value: '', disabled: true }, Validators.required),
    appointmentType: new FormControl(""),
    description: new FormControl(""),
    patientID: new FormControl(""),
    timeSlot: new FormControl(""),
    charges: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUserMeRes;
  public diseasListData: any = [];
  public filterDoctorData: any = [];
  public selecteddoctorid;
  public displayDate = '';
  public getImageValue;
  public newArray1: any = [];
  public currentUserLoginResponse;
  public showpatientformpopup = false;
  public getpatientprofileid = '';
  public dayPickerConfig = <IDayCalendarConfig>{
    locale: "in",
    format: "DD/MM/YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    min: "01/09/2020",
    max: "30/11/2020"
  };
  textareaValue: string = '';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUserLoginResponse = JSON.parse(window.localStorage.getItem("userToken"));//role not coming in userme api so need to take value from both storage because patient all info come in userme not in login response
    this.currentUserMeRes = JSON.parse(window.localStorage.getItem("currentusermedata"));
    this.Get_DiseasesList();
    this.Get_PatientsList();
    if (this.currentUserMeRes.user && this.currentUserMeRes.user._id && this.currentUserLoginResponse.user.role < 1) {
      this.updatePatientDetails(this.currentUserMeRes.user);  //for admin no need to updatepatientdetail
    }
    if (this.currentUserLoginResponse.user && this.currentUserLoginResponse.user.role == 11) {
      this.visiblePatientNameSelect = true;
    } else {
      this.visiblePatientNameSelect = false;
    }
    this.displayDate=this.utilityservice.ToDisplayDateFormat(new Date());

    this.resetSlotData();
  }

  resetSlotData(){
    this.completeTimeSlotDataArray = [
      { "id": 0,"name":"10:00 AM - 11:00 AM", "isSlotBooked": false },
      { "id": 1,"name":"11:00 AM - 12:00 PM", "isSlotBooked": false },
      { "id": 2,"name":"12:00 PM - 01:00PM", "isSlotBooked": false },
      { "id": 3,"name":"01:00 PM - 02:00PM", "isSlotBooked": false },
      { "id": 4,"name":"02:00 PM - 03:00PM", "isSlotBooked": false },
      { "id": 5,"name":"03:00 PM - 04:00PM", "isSlotBooked": false },
      { "id": 6,"name":"04:00 PM - 05:00PM", "isSlotBooked": false },
      { "id": 7,"name":"05:00 PM - 06:00PM", "isSlotBooked": false },
    ]    
  }

  get f() { return this.bookAppointmentForm.controls; }


  Get_AppointmentsByDocID() {
    let dataobj={
      doctorID:this.bookAppointmentForm.controls.doctorID.value,
      appointmentDate:this.utilityservice.ToDBDateFormat(this.bookAppointmentForm.controls.appointmentDate.value),
    }
    this._apiservice.Get_AppointmentsByDocID(dataobj).subscribe(data => {
      if (data) {
        this.resetSlotData();
        if(data.length>0)
        {
          this.filterTimeSlotDataArray=[];
          this.doctorWiseAppointmentData = data.filter(function (item) {
            return item.isVisitCompleted == false;
          });
          for (var i = 0; i < this.completeTimeSlotDataArray.length; i++) {
            var ispush=true;
            for (var j = 0; j < this.doctorWiseAppointmentData.length; j++) {
              if (this.completeTimeSlotDataArray[i].id == this.doctorWiseAppointmentData[j].timeSlot) {
                ispush=false;
                break;
              }
            }
            if (ispush) {
              this.completeTimeSlotDataArray[i].isSlotBooked = false
            } else {
              this.completeTimeSlotDataArray[i].isSlotBooked = true
            }
            this.filterTimeSlotDataArray.push(this.completeTimeSlotDataArray[i])
          }
        }
        else{
          this.filterTimeSlotDataArray =this.completeTimeSlotDataArray;
        }
      }
     
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Save_BookAppointment() {
    this.submitted = true;
    if (this.bookAppointmentForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj: any = {};
    dataobj = this.bookAppointmentForm.value;
    dataobj.appointmentDate = this.utilityservice.ToDBDateFormat(dataobj.appointmentDate);
    dataobj.timeSlot = parseInt(dataobj.timeSlot);
    this._apiservice.Save_BookAppointment(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

 

  Get_DiseasesList() {
    let dataobj = {
    };
    this._apiservice.Get_DiseasesList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_DiseasesList is ", data);
        this.diseasListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  diseaseschangeevent($event) {
    this.getImageValue = '';
    let newArray = this.diseasListData.filter(function (item) {
      return item.diseaseName == $event.target.value;
    });

    if (newArray) {
      this.Get_FilteredDoctors(newArray[0].takeCareBy);
    }
  }

  doctorChangeEvent($event) {
    this.getImageValue = '';
    this.disableAvailableTimeSlotBtn=false;
    this.bookAppointmentForm.controls.appointmentDate.enable();
    this.bookAppointmentForm.controls.appointmentDate.updateValueAndValidity();
    this.bookAppointmentForm.patchValue({
      appointmentDate:''
    })
    this.newArray1 = this.filterDoctorData.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (this.newArray1) {
      this.bookAppointmentForm.controls.doctorID.setValue(this.newArray1[0]._id);
      this.bookAppointmentForm.controls.charges.setValue(this.newArray1[0].charges);
      this.getImageValue = this.arrayBufferToBase64(this.newArray1[0].newimage.data.data);//need to update data in base 64
    }
  }
  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  Get_FilteredDoctors(experties) {
    let dataobj = {};
    this._apiservice.Get_FilteredDoctors(dataobj, experties).subscribe(data => {
      if (data) {
        console.log("filterDoctorData ", data);
        this.filterDoctorData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  patientNameChangeEvent($event) {
    let newArray = this.patientListData.filter(function (item) {
      return item._id == $event.target.value;
    });
    if (newArray) {
      this.updatePatientDetails(newArray[0]);
    }
  }

  Get_PatientsList() {
    let dataobj = {
    };
    this._apiservice.Get_PatientsList(dataobj).subscribe(data => {
      if (data) {
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  public async closePatientProfilePopup() {
    this.showpatientformpopup = false;
    $('#showpatientformpopup').modal('hide');
  }

  public openPatientProfilePopup() {
    this.showpatientformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpatientformpopup').modal('show');
    }, 100);
  }

  userme() {
    let dataparam: any = {};
    this._apiservice.userme(dataparam).subscribe(data => {
      console.log("userme data is this", JSON.stringify(data));
      this.currentUserMeRes = JSON.parse(window.localStorage.getItem("currentusermedata"));
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  updatePatientDetails(patientdetail) {
    this.bookAppointmentForm.patchValue({
      patientNname: patientdetail.name,
      patientEmail: patientdetail.email,
      patientMob: patientdetail.phoneno,
      patientAddres: patientdetail.address,
      patientID: patientdetail._id,
    });

    this.textareaValue = 
  `  ----Patient Details----
  Name: ${patientdetail.name}
  Email: ${patientdetail.email}
  Phone: ${patientdetail.phoneno}
  Add: ${patientdetail.address}`;

    this.getpatientprofileid = this.bookAppointmentForm.controls.patientID.value;   //for sending in patient profile popup
  }

  public async patientProfileResponseReturn(value) {
    if (this.currentUserMeRes.user && this.currentUserMeRes.user._id && this.currentUserLoginResponse.user.role < 1) {
      await this.userme();  //for admin no need to update
    }
    this.Get_PatientsList();     //update list in return if new patient added and any updation in list
    this.updatePatientDetails(value);
  }
}

