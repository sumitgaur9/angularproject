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
public appointmentTypeData=[{"name":"HomeVisit"},{"name":"Online"}]



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
    appointmentDate: new FormControl(""),
    appointmentType: new FormControl(""),
    description: new FormControl(""),
   // patientID: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;
  public diseasListData: any = [];
  public filterDoctorData: any = [];
  public selecteddoctorid;
  public displayDate= '05/07/2020';
  public getImageValue;  
  public newArray1: any = [];

  public showpatientformpopup = false;
  public getpatientprofileid='';

  public dayPickerConfig = <IDayCalendarConfig>{
    locale: "in",
    format: "DD/MM/YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",                     
    min: "01/07/2020",
    max: "30/08/2020"
  };
  textareaValue;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("currentusermedata"));
    this.Get_DiseasesList();

    if(this.currentUser.user && this.currentUser.user._id){
      this.getpatientprofileid = this.currentUser.user._id;
    }

    this.updatePatientDetails(this.currentUser);
   
  }

  updatePatientDetails(currentUser){

    this.bookAppointmentForm.patchValue({
      patientNname: currentUser.user.name,
      patientEmail: currentUser.user.email,
      patientMob: currentUser.user.phoneno,
      patientAddres: currentUser.user.address,  
    });

    this.textareaValue = `Pat. Name: ${currentUser.user.name}

Pat. Email: ${currentUser.user.email}

Pat. Phone: ${currentUser.user.phoneno}

Pat. Add: ${currentUser.user.address}`;

  }
  
  get f() { return this.bookAppointmentForm.controls; }

  Save_BookAppointment() {
    console.log("this.bookAppointmentForm.valuethis.bookAppointmentForm.valuethis.bookAppointmentForm.value",this.bookAppointmentForm.value);
    this.submitted = true;
    if (this.bookAppointmentForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj:any = {};
    dataobj = this.bookAppointmentForm.value;
    // dataobj.appointmentDate="2020/07/29";
    dataobj.appointmentDate=  this.ToDBDateFormat(dataobj.appointmentDate);
    dataobj["patientID"]  = this.currentUser.roleBaseId;;//"5f2e69e9afc7cc00045f7ccf";
    this._apiservice.Save_BookAppointment(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  defaultDateDBFormat() {
    return "1753-01-01 00:00:00";
}


   ToDBDateFormat(input) {
    if (input) {
        if (input.length == 10) {
            var dt = moment(input, 'DD/MM/YYYY').format('YYYY/MM/DD');
            return dt;
        }
    }
    if (this.isAbValidDate(input) == false) {
        return this.defaultDateDBFormat();
    }
    if (input) {
        var result = new Date(input);
        if (result) {
            return this.ToSpecificDateFormat(result, AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
        }
    }
    return this.ToSpecificDateFormat(this.defaultDateDBFormat(), AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
}

defaultDateDispFormat() {
  return "01/01/1753";
}


 ToSpecificDateFormat(input, format) {
  var result = input;
  try {
      switch (format) {
          case AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS:
              result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
              break;
          case AppEnum.AbDateTimeType.MM_DD_YYYY_HH_mm_ss:
              result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
              break;
          case AppEnum.AbDateTimeType.DD_MM_YYYY:
              result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
              break;
          case AppEnum.AbDateTimeType.DD_MM_YY:
              result = moment(input, 'DD/MM/YYYY').format('dd/MM/yy');
              break;
          case AppEnum.AbDateTimeType.MM_DD_YYYY:
              result = moment(input, 'DD/MM/YYYY').format('MM/dd/yyyy');
              break;
          // case AppEnum.AbDateTimeType.hh_mm:
          //     result = moment(input, 'DD/MM/YYYY').format('hh:MM');
          //     break;
          // case AppEnum.AbDateTimeType.hh_mm_24:
          //     result = moment(input, 'DD/MM/YYYY').format('HH:MM');
          //     break;
          // case AppEnum.AbDateTimeType.yyyy:
          //     result = moment(input, 'DD/MM/YYYY').format('yyyy');
          //     break;
          // case AppEnum.AbDateTimeType.yy:
          //     result = moment(input, 'DD/MM/YYYY').format('yy');
          //     break;
          // case AppEnum.AbDateTimeType.y:
          //     result = moment(input, 'DD/MM/YYYY').format('y');
          //     break;
          // case AppEnum.AbDateTimeType.MMMM:
          //     result = moment(input, 'DD/MM/YYYY').format('MMMM');
          //     break;
          // case AppEnum.AbDateTimeType.MMM:
          //     result = moment(input, 'DD/MM/YYYY').format('MMM');
          //     break;
          // case AppEnum.AbDateTimeType.MM:
          //     result = moment(input, 'DD/MM/YYYY').format('MM');
          //     break;
          // case AppEnum.AbDateTimeType.M:
          //     result = moment(input, 'DD/MM/YYYY').format('M');
          //     break;
          // case AppEnum.AbDateTimeType.dd:
          //     result = moment(input, 'DD/MM/YYYY').format('dd');
          //     break;
          // case AppEnum.AbDateTimeType.d:
          //     result = moment(input, 'DD/MM/YYYY').format('d');
          //     break;
          // case AppEnum.AbDateTimeType.EEEE:
          //     result = moment(input, 'DD/MM/YYYY').format('EEEE');
          //     break;
          // case AppEnum.AbDateTimeType.EEE:
          //     result = moment(input, 'DD/MM/YYYY').format('EEE');
          //     break;
          // case AppEnum.AbDateTimeType.HH:
          //     result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
          //     break;
          // case AppEnum.AbDateTimeType.H:
          //     result = moment(input, 'DD/MM/YYYY').format('HH');
          //     break;
          // case AppEnum.AbDateTimeType.hh:
          //     result = moment(input, 'DD/MM/YYYY').format('hh');
          //     break;
          case AppEnum.AbDateTimeType.YYYY_MM_DD:
              result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
              break;

      }
  }
  catch (err) {
      result = this.defaultDateDispFormat();
  }
  return result;
}

 isAbValidDate(input) {
  //if ((new Date(input) != "Invalid Date") && !isNaN(new Date(input))) {  // to be correct
  if (input != '') {

      if (input == '1753-01-01 00:00:00') {
          return false;
      }
      if (new Date(input).getMonth() != undefined) {
          return true;
      }
      else {
          return false;
      }
  }
  else {
      return false;
  }
}



  public async closePatientProfilePopup() {
    await this.userme();
   
    //  this.Get_PatientsList(); // need to update the patiet details
   

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
      this.currentUser = JSON.parse(window.localStorage.getItem("currentusermedata"));

      this.updatePatientDetails(this.currentUser);
  
      this.showpatientformpopup = false;
      $('#showpatientformpopup').modal('hide');

    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
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
    this.newArray1 = this.filterDoctorData.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (this.newArray1) {
      this.bookAppointmentForm.controls.doctorID.setValue(this.newArray1[0]._id);
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



}

