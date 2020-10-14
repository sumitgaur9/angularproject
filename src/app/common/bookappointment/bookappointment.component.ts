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
  public visibleTimeSlot:boolean = false;


  public bookAppointmentForm = new FormGroup({
    patientNname: new FormControl(""),
    patientAge: new FormControl(18),
    patientSex: new FormControl(1),
    patientEmail: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    patientMob: new FormControl(""),
    patientAddres: new FormControl(""),
    patientPIN: new FormControl(""),
   // disease: new FormControl(""),
   // diseaseAge: new FormControl(""),
    doctorID: new FormControl(""),
    doctorName: new FormControl(""),
    appointmentDate: new FormControl({ value: '', disabled: true }, Validators.required),
    appointmentType: new FormControl(""),
    description: new FormControl(""),
    patientID: new FormControl(""),
    timeSlot: new FormControl(""),
    charges: new FormControl(""),
    diseasesData: new FormControl([[]]),
    symptomsData: new FormControl([[]]),
    illnessHistoryData: new FormControl([[]]),
  });

  public passwordPatternError = false;
  public currentUserMeRes;
  public diseasListData: any = [];
  public completeDiseasListData:any=[];
 // public filterDoctorData: any = [];
  public tempfilterDoctorListData:any=[];
  public selecteddoctorid;
  public displayDate = '';
  public getImageValue;
  public newArray1: any = [];
  public currentUserLoginResponse;
  public showpatientformpopup = false;
  public getpatientprofileid = '';
  public completeDoctorListData:any=[];
  public dayPickerConfig = <IDayCalendarConfig>{
    locale: "in",
    format: "DD/MM/YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    min: "13/10/2020",
    max: "30/11/2020"
  };
  textareaValue: string = '';
  itemList = [];
  selectedItems = [];
  settings = {};
  

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUserLoginResponse = JSON.parse(window.sessionStorage.getItem("userToken"));//role not coming in userme api so need to take value from both storage because patient all info come in userme not in login response
    this.currentUserMeRes = JSON.parse(window.sessionStorage.getItem("currentusermedata"));
    this.Get_DiseasesList();
    this.Get_PatientsList();
    this.Get_DoctorsList();
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

    this.selectedItems = [];
    this.settings = {
      text: "Select Diseases",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };
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
        this.visibleTimeSlot = true;
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
    if(this.selectedItems && this.selectedItems.length>0)
    {
      dataobj.diseasesData=[];
      for (var i = 0; i < this.selectedItems.length; i++) {
        let testdataobj = {
          "diseasesID": this.selectedItems[i].id,
          "diseaseName": this.selectedItems[i].itemName,
        }
        dataobj.diseasesData.push(testdataobj);
      }
    }
    else{
      this.toastr.success('Please Select Diseases');
      return;
    }
    dataobj.appointmentDate = this.utilityservice.ToDBDateFormat(dataobj.appointmentDate);
    dataobj.timeSlot = parseInt(dataobj.timeSlot);
    this._apiservice.Save_BookAppointment(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('Thanks to booking an Appointment');
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
        console.log("medicineListDataArray ", data);
        this.completeDiseasListData=data;
        for (var i = 0; i < data.length; i++) {
          let dataobj1 = {
            "id": data[i]._id,
            "itemName": data[i].diseaseName
          }
          this.diseasListData.push(dataobj1);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  datechange(){
    this.disableAvailableTimeSlotBtn= false;
    this.visibleTimeSlot= false;
    }

  doctorChangeEvent($event) {
    this.getImageValue = '';
     this.bookAppointmentForm.controls.appointmentDate.enable();
    this.bookAppointmentForm.controls.appointmentDate.updateValueAndValidity();
    this.visibleTimeSlot= false;
    this.bookAppointmentForm.patchValue({
      appointmentDate:''
    })
    this.newArray1 = this.tempfilterDoctorListData.filter(function (item) {
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

  // Get_FilteredDoctors(experties) {
  //   let dataobj = {};
  //   this._apiservice.Get_FilteredDoctors(dataobj, experties).subscribe(data => {
  //     if (data) {
  //       console.log("filterDoctorData ", data);
  //       this.filterDoctorData = data;
  //     }
  //   }, error => {
  //     this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  //   });
  // }

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
      this.currentUserMeRes = JSON.parse(window.sessionStorage.getItem("currentusermedata"));
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  updatePatientDetails(patientdetail) {
    this.bookAppointmentForm.patchValue({
      patientNname: patientdetail.name,
      patientAge: patientdetail.age,
      patientSex: patientdetail.gender,
      patientEmail: patientdetail.email,
      patientMob: patientdetail.phoneno,
      patientAddres: patientdetail.address,
      patientID: patientdetail._id,
    });

    this.textareaValue = 
  `  ----Patient Details----
  Name: ${patientdetail.name}
  Age: ${patientdetail.age}
  Sex: ${patientdetail.gender==1?'Male':'Female'}
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

  onDiseasesItemSelect(item: any) {
   // console.log(item);
    console.log("onDiseasesItemSelect",item);
    this.diseaseschangeevent(item.itemName,"singleSelectionAdd")
  }
  OnDiseasesItemDeSelect(item: any) {
    console.log("OnDiseasesItemDeSelect",item);
    this.diseaseschangeevent(item.itemName,"singleSelectionRemove")
   // console.log(this.selectedItems);
  }
  onDiseasesSelectAll(items: any) {
    console.log("onDiseasesSelectAll",items);
    for(var i=0;i<items.length;i++)
    {
      this.diseaseschangeevent(items[i].itemName,"multiSelectionAdd")
    }
  }
  onDiseasesDeSelectAll(items: any) {
    console.log("onDiseasesSelectAll",items);
    this.diseaseschangeevent(items.itemName,"multiSelectionRemove")
   // console.log(items);
  }

  diseaseschangeevent(diseasesname, selectionType) {
    this.filterTimeSlotDataArray = [];
    this.filterTimeSlotDataArray = [];
    this.visibleTimeSlot = false;
    this.bookAppointmentForm.patchValue({
      doctorID: ''
    })
    this.bookAppointmentForm.patchValue({
      doctorName: ''
    })
    this.disableAvailableTimeSlotBtn = true;
    this.bookAppointmentForm.patchValue({
      appointmentDate: ''
    })
    this.getImageValue = '';
    //  var newArray;
    if (selectionType == "singleSelectionAdd") {
      let newArray = this.completeDiseasListData.filter(function (item) {
        return item.diseaseName == diseasesname;
      });
      if (newArray) {
        // this.Get_FilteredDoctors(newArray[0].takeCareBy);
        let tempDoctorData = this.completeDoctorListData.filter(function (item) {
          return item.experties == newArray[0].takeCareBy;
        });
        if (tempDoctorData && tempDoctorData.length > 0) {
          for (var i = 0; i < tempDoctorData.length; i++) {
            if (this.tempfilterDoctorListData.length > 0) {
              let doctorAlreadyExistInFilteredDoctor = this.tempfilterDoctorListData.filter(function (item) {
                return item._id == tempDoctorData[i]._id;
              });
              if (doctorAlreadyExistInFilteredDoctor && doctorAlreadyExistInFilteredDoctor.length < 1) {
                this.tempfilterDoctorListData.push(tempDoctorData[i]);
              }
            }
            else {
              this.tempfilterDoctorListData.push(tempDoctorData[i]);
            }
          }
        }
      }
    }

    else if (selectionType == "singleSelectionRemove") {
      let newArray = this.completeDiseasListData.filter(function (item) {
        return item.diseaseName == diseasesname;
      });
      if (newArray) {
        let tempFilterDoctorList = this.completeDoctorListData.filter(function (item) {
          return item.experties == newArray[0].takeCareBy;
        });
        if (tempFilterDoctorList && tempFilterDoctorList.length > 0) {
          for (var i = 0; i < this.tempfilterDoctorListData.length; i++) {
            for (var j = 0; j < tempFilterDoctorList.length; j++) {
              if (this.tempfilterDoctorListData[i]._id == tempFilterDoctorList[j]._id) {
                this.tempfilterDoctorListData.splice(i, 1);
              }
            }

          }
        }
      }
    }
    else if (selectionType == "multiSelectionRemove") {
      this.tempfilterDoctorListData = [];
    }
  }

  Get_DoctorsList() {
    let dataobj = {
    };
    this._apiservice.Get_DoctorsList(dataobj).subscribe(data => {
      if (data) {
        this.completeDoctorListData=data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}

