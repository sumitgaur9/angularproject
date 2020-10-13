import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";


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




  @Input() inputrequesPatMedHomeDeliveryData: any;

  public sheduleMedicineTableData: any = [];

  public dayPickerConfig = <IDayCalendarConfig>{
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


  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


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
  });

  public passwordPatternError = false;
  public pharmacistListDataArray: any = [];


  public currentUser;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }


  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_MedicinesList();
    this.Get_PharmacistsList();
    this.reqPatientMedicinesHomeDeliveryForm.patchValue({
      patientName: this.inputrequesPatMedHomeDeliveryData.patientNname,
      patientAddress: this.inputrequesPatMedHomeDeliveryData.patientAddres,
      patientPIN: this.inputrequesPatMedHomeDeliveryData.patientPIN,
      patientContactNo: this.inputrequesPatMedHomeDeliveryData.patientMob,
    })

    this.medicineListDataArray = [];
    this.selectedItems = [];


    this.settings = {
      text: "Select Medicines",
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

  medicineChangeEvent($event) {
    let newArray = this.medicineListDataArray.filter(function (item) {
      return item.medicineName == $event.target.value;
    });
    if (newArray) {
      this.reqPatientMedicinesHomeDeliveryForm.patchValue(
        {
          medicineID: newArray[0]._id
        }
      )
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
    let dataobj: any = {};
    let tempObj: any = {};
    let medicinesData: any = [];
    dataobj.patientName = this.reqPatientMedicinesHomeDeliveryForm.controls.patientName.value;
    dataobj.appointmentID = this.appointmentid;
    dataobj.doctorID = this.reqByDoctorId;
    dataobj.patientID = this.reqByPatientId;
    dataobj.doctorName = this.reqByDoctorName;
    dataobj.pharmacistID = this.reqPatientMedicinesHomeDeliveryForm.controls.pharmacistID.value;
    dataobj.pharmacistName = this.reqPatientMedicinesHomeDeliveryForm.controls.pharmacistName.value;
    dataobj.patientContactNo = this.reqPatientMedicinesHomeDeliveryForm.controls.patientContactNo.value;
    dataobj.patientAddress = this.reqPatientMedicinesHomeDeliveryForm.controls.patientAddress.value;
    dataobj.patientContactNo = this.reqPatientMedicinesHomeDeliveryForm.controls.patientContactNo.value;
    dataobj.patientPIN = this.reqPatientMedicinesHomeDeliveryForm.controls.patientPIN.value;

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
    dataobj.medicinesData = medicinesData;
    dataobj.patientPIN = this.reqPatientMedicinesHomeDeliveryForm.controls.patientPIN.value;
    this._apiservice.Request_PatientMedicinesHomeDelivery(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success("Thanks to being a part of our platform", '', {
          timeOut: 8000,
        });
        this.CloseModal();
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


  datechange() {
    // this.disableAvailableTimeSlotBtn= false;
    //this.visibleTimeSlot= false;
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


}