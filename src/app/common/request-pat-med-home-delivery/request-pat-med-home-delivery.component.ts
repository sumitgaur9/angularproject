import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
declare var $: any;


@Component({
  selector: 'app-request-pat-med-home-delivery',
  templateUrl: './request-pat-med-home-delivery.component.html',
  styleUrls: ['./request-pat-med-home-delivery.component.css']
})
export class RequestPatMedHomeDeliveryComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() appointmentid: string = '';
  @Input() reqByDoctorId: string = '';
  @Input() reqByPatientId: string = '';
  @Input() reqByDoctorName: string = '';
  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  @Input() inputrequesPatMedHomeDeliveryData: any;
  public displayDate = '';

  public sheduleMedicineTableData: any = [];
  public dayPickerConfig = <IDayCalendarConfig>{
    locale: "in",
    format: "DD/MM/YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    min: "13/10/2020",
    max: "30/11/2020"
  };

  public dayPickerConfigApptDate = <IDayCalendarConfig>{
    locale: "in",
    format: "DD/MM/YYYY",
    monthFormat: "MMMM, YYYY",
    firstDayOfWeek: "mo",
    min: "13/10/2020",
    max: "30/11/2020"
  };


  public dayPickerTimeConfig = <IDayCalendarConfig>{
    locale: "in",
    showTwentyFourHours: false,
    meridiemFormat: "A",
    //format: "hh:mm",
  };
  public medicineListDataArray: any = [];
  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }
  public submitted = false;
  errorMessage = '';
  itemList = [];
  selectedItems = [];
  keyword = 'name';
  public instructionDataArray: any = [
    { "name": "Before Breakfast" },
    { "name": "After Breakfast" },
    { "name": "Before Lunch" },
    { "name": "After Lunch" },
    { "name": "Before Dinner" },
    { "name": "After Dinner" }]
  settings = {};
  public labtestListDataArray: any = [];
  selectedLabTestItems = [];
  settingsLabTest= {};
  public reqPatientMedicinesHomeDeliveryForm = new FormGroup({
    patientName: new FormControl("", Validators.required),
    patientContactNo: new FormControl("", Validators.required),
    pharmacistID: new FormControl("", Validators.required),
    pharmacistName: new FormControl("", Validators.required),
    patientAddress: new FormControl("", Validators.required),
    patientPIN: new FormControl("", Validators.required),
    scheduleDate: new FormControl(""),
    scheduleTime: new FormControl(""),
    processInfo: new FormControl(""),
    medicineName: new FormControl([[]]),
    LabTestName: new FormControl([[]]),
    isNextVisitRequired:  new FormControl(false),
    nextAppointmentDate: new FormControl(""),
    nextAppointmentTime: new FormControl(""),
  });
  public passwordPatternError = false;
  public pharmacistListDataArray: any = [];
  public getmedicineprofileid:string='';
  public showMedicineprofileformpopup:boolean=false;
  public currentUser;
  public filterTimeSlotDataArray:any=[];
  public doctorWiseAppointmentData:any=[];
  public completeTimeSlotDataArray:any=[]; 
  public visibleTimeSlot:boolean = false;
  public disableAvailableTimeSlotBtn:boolean=true;


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }


  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_MedicinesList();
    this.Get_PharmacistsList();
    this.Get_LabTestsList();
    this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      patientName: this.inputrequesPatMedHomeDeliveryData.patientNname,
      patientAddress: this.inputrequesPatMedHomeDeliveryData.patientAddres,
      patientPIN: this.inputrequesPatMedHomeDeliveryData.patientPIN,
      patientContactNo: this.inputrequesPatMedHomeDeliveryData.patientMob,
    })
    this.resetSlotData();
    this.medicineListDataArray = [];
    this.selectedItems = [];
    this.settings = {
      text: "Select Medicines",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

    this.labtestListDataArray = [];
    this.selectedLabTestItems = [];
    this.settingsLabTest = {
      text: "Select Lab Tests (If Required)",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };
  }


  get f() { return this.reqPatientMedicinesHomeDeliveryForm.controls; }

  pharmacistChangeEvent($event) {
    let newArray = this.pharmacistListDataArray.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.reqPatientMedicinesHomeDeliveryForm.patchValue(
        {
          pharmacistID: newArray[0]._id
        })
    }
  }


  Request_PatientMedicinesHomeDelivery() {
    this.submitted = true;
    if (this.reqPatientMedicinesHomeDeliveryForm.invalid) {
      return;
    }
    if (this.sheduleMedicineTableData.length < 1) {
      this.toastr.error('Please provide atleast one record', '', {
        timeOut: 5000,
      });
      return;
    }
    this.errorMessage = "";
    let PatientMedicinesForHomeDelivery: any = {};
    let nextAppointmentData: any = {};
    let tempObj: any = {};
    let medicinesData: any = [];
    let compDataObj:any={};

    PatientMedicinesForHomeDelivery.patientName = this.reqPatientMedicinesHomeDeliveryForm.controls.patientName.value;
    PatientMedicinesForHomeDelivery.appointmentID = this.appointmentid;
    PatientMedicinesForHomeDelivery.doctorID = this.reqByDoctorId;
    PatientMedicinesForHomeDelivery.patientID = this.reqByPatientId;
    PatientMedicinesForHomeDelivery.doctorName = this.reqByDoctorName;
    PatientMedicinesForHomeDelivery.pharmacistID = this.reqPatientMedicinesHomeDeliveryForm.controls.pharmacistID.value;
    PatientMedicinesForHomeDelivery.pharmacistName = this.reqPatientMedicinesHomeDeliveryForm.controls.pharmacistName.value;
    PatientMedicinesForHomeDelivery.patientContactNo = this.reqPatientMedicinesHomeDeliveryForm.controls.patientContactNo.value;
    PatientMedicinesForHomeDelivery.patientAddress = this.reqPatientMedicinesHomeDeliveryForm.controls.patientAddress.value;
    PatientMedicinesForHomeDelivery.patientContactNo = this.reqPatientMedicinesHomeDeliveryForm.controls.patientContactNo.value;
    PatientMedicinesForHomeDelivery.patientPIN = this.reqPatientMedicinesHomeDeliveryForm.controls.patientPIN.value;



    


    let labtestdataarray=[];    
    this.selectedLabTestItems.forEach(element => {
      let dataobjec = {
        testID: element.id,
        testname: element.itemName
      }
      labtestdataarray.push(dataobjec);
    });
    PatientMedicinesForHomeDelivery.testsData =  labtestdataarray;

    for (var i = 0; i < this.sheduleMedicineTableData.length; i++) {
      let tempObj: any = {};
      let splitMedicineName = this.sheduleMedicineTableData[i].medicineScheduleName.split(',');
      let splitMedicineID = this.sheduleMedicineTableData[i].medicineScheduleId.split(',');
      let medicinesdataArrayForFixTimeSlot: any = [];
      let selectedMedicineData: any = [];
      tempObj.medicineSNo = i + 1;
      tempObj.processInfo = this.sheduleMedicineTableData[i].processInfo;
      tempObj.medicineScheduleTime = this.sheduleMedicineTableData[i].medicineScheduleTime;
      tempObj.medicineScheduleDate = this.sheduleMedicineTableData[i].medicneScheduleDate;
      for (var j = 0; j < splitMedicineName.length; j++) {
        let medicineNameIdObj: any = {};
        medicineNameIdObj.medicineID = splitMedicineID[j];
        medicineNameIdObj.medicineName = splitMedicineName[j];
        medicinesdataArrayForFixTimeSlot.push(medicineNameIdObj);
      }
      tempObj.medicinesdataArrayForFixTimeSlot = medicinesdataArrayForFixTimeSlot;
      medicinesData.push(tempObj);
    }
    PatientMedicinesForHomeDelivery.medicinesData = medicinesData;
    PatientMedicinesForHomeDelivery.patientPIN = this.reqPatientMedicinesHomeDeliveryForm.controls.patientPIN.value;
    compDataObj.PatientMedicinesForHomeDelivery=PatientMedicinesForHomeDelivery;
    nextAppointmentData.isNextVisitRequired = this.reqPatientMedicinesHomeDeliveryForm.controls.isNextVisitRequired.value;
    nextAppointmentData.nextAppointmentDate =this.utilityservice.ToDBDateFormat(this.reqPatientMedicinesHomeDeliveryForm.controls.nextAppointmentDate.value);
    nextAppointmentData.nextAppointmentTime = this.reqPatientMedicinesHomeDeliveryForm.controls.nextAppointmentTime.value;
    compDataObj.nextAppointmentData=nextAppointmentData;
    this._apiservice.Request_PatientMedicinesHomeDelivery(compDataObj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success("Thanks to being a part of our platform", '', {
          timeOut: 8000,
        });
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message;
      this.toastr.error(error.error.message, '', {
        timeOut: 8000,
      });
    });
  }

  Get_PharmacistsList() {
    let dataobj = {
    };
    this._apiservice.Get_PharmacistsList(dataobj).subscribe(data => {
      if (data) {
        console.log("pharmacistListDataArray ", data);
        this.pharmacistListDataArray = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_MedicinesList(companyName?) {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj, companyName).subscribe(data => {
      if (data) {
        console.log("medicineListDataArray ", data);
        this.medicineListDataArray=[];
        for (var i = 0; i < data.length; i++) {
          let dataobj1 = {
            "id": data[i]._id,
            "itemName": data[i].medicineName
          }
          this.medicineListDataArray.push(dataobj1);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_LabTestsList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsList(dataobj).subscribe(data => {
      if (data) {
        console.log("labtestListDataArray ", data);
        this.labtestListDataArray=[];
        for (var i = 0; i < data.length; i++) {
          let dataobj1 = {
            "id": data[i]._id,
            "itemName": data[i].testName
          }
          this.labtestListDataArray.push(dataobj1);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; 
      this.toastr.error(error.error.message);
    });
  }


  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }


  onLabTestItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnLabTestItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onLabTestSelectAll(items: any) {
    console.log(items);
  }
  onLabTestDeSelectAll(items: any) {
    console.log(items);
  }

  public SendDataInTableValue() {
    if (this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == undefined ||
      this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == null ||
      this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value == '') {
      this.toastr.warning("Please Select ScheduleDate", '', {
        timeOut: 6000,
      });
      return;
    }
    else if (this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == undefined ||
      this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == null ||
      this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value == '') {
      this.toastr.warning("Please Select ScheduleTime", '', {
        timeOut: 6000,
      });
      return;
    }
    else if (this.selectedItems.length < 1) {
      this.toastr.warning("Please Select Medicine", '', {
        timeOut: 6000,
      });
      return;
    }
    else if (this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == undefined ||
      this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == null || this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value == '') {
      this.toastr.warning("Please Select Instruction", '', {
        timeOut: 6000,
      });
      return;
    }
    let selectedDataValue: any = [];
    let selectedMedicineName: any = [];
    let selectedMedicineID: any = [];

    let dataobj: any = {};
    dataobj.medicneScheduleDate = this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleDate.value;
    dataobj.medicineScheduleTime = this.reqPatientMedicinesHomeDeliveryForm.controls.scheduleTime.value;
    dataobj.processInfo = this.reqPatientMedicinesHomeDeliveryForm.controls.processInfo.value;
    for (var i = 0; i < this.selectedItems.length; i++) {
      let testdataobj = {
        "id": this.selectedItems[i].id,
        "itemName": this.selectedItems[i].itemName,
      }
      selectedDataValue.push(testdataobj);
      selectedMedicineName.push(this.selectedItems[i].itemName);
      selectedMedicineID.push(this.selectedItems[i].id);
    }
    dataobj.medicineScheduleName = selectedMedicineName.toString();
    dataobj.medicineScheduleId = selectedMedicineID.toString();
    this.sheduleMedicineTableData.push(dataobj);
    this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      scheduleDate: '',
      scheduleTime: '',
      processInfo: '',
    })
    this.selectedItems = [];
  }

  deleteMedicineDetailRow(index: number) {
    this.sheduleMedicineTableData.splice(index, 1);
  }

  Get_SlotData() {
    let dataobj={
      doctorID:this.reqByDoctorId,
      appointmentDate:this.utilityservice.ToDBDateFormat(this.reqPatientMedicinesHomeDeliveryForm.controls.nextAppointmentDate.value),
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

  datechange(){
    console.log(this.reqPatientMedicinesHomeDeliveryForm.controls.nextAppointmentDate.value);
    console.log(this.reqPatientMedicinesHomeDeliveryForm.controls.nextAppointmentDate.value);
    this.disableAvailableTimeSlotBtn= false;
    this.visibleTimeSlot= false;
  }

  isNextVisitRequiredChangeEvent(event)
  {
    this.disableAvailableTimeSlotBtn= true;
    this.visibleTimeSlot= false;
  }

  selectEventInstruction(item) {
    // do something with selected item
    console.log("selectEvent", item);
    this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      processInfo: item.name
    })

  }

  onChangeSearchInstruction(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("onChangeSearch", val);
    this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      processInfo: val
    })
  }

  onFocusedInstruction(e) {
    // do something when input is focused
  }

  public closeMedicineProfilePopup(calllistapi) {
    this.showMedicineprofileformpopup = false;
    $('#showMedicineprofileformpopup').modal('hide');
    if (calllistapi) {
      this.Get_MedicinesList();
    }
  }

  public openMedicineProfilePopup(id?) {
    if (id == undefined || id == null || id == '') {
      this.getmedicineprofileid ='';
    }
    this.showMedicineprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showMedicineprofileformpopup').modal('show');
    }, 100);
  }
}