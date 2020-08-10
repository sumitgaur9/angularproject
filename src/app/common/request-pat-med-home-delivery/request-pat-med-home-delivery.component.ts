import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-request-pat-med-home-delivery',
  templateUrl: './request-pat-med-home-delivery.component.html',
  styleUrls: ['./request-pat-med-home-delivery.component.css']
})
export class RequestPatMedHomeDeliveryComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() appointmentid:string='';
  @Input() inputrequesPatMedHomeDeliveryData:any;

  

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  
  public reqPatientMedicinesHomeDeliveryForm = new FormGroup({
    patientName:new FormControl(""),
    medicineName: new FormControl(""),
    patientContactNo: new FormControl(""),
    medicineID: new FormControl(""),
    pharmacistID: new FormControl(""),
    pharmacistName: new FormControl(""),
    patientAddress: new FormControl(""),
    patientPIN: new FormControl(""),

  });

  public passwordPatternError = false;
  public medicineListDataArray:any=[];
  public pharmacistListDataArray:any=[];


  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_MedicinesList();
  this.Get_PharmacistsList();
  this.reqPatientMedicinesHomeDeliveryForm.patchValue({
    patientName:this.inputrequesPatMedHomeDeliveryData.patientNname,
    patientAddress:this.inputrequesPatMedHomeDeliveryData.patientAddres,
    patientPIN:this.inputrequesPatMedHomeDeliveryData.patientPIN,
    patientContactNo:this.inputrequesPatMedHomeDeliveryData.patientMob,
  })
  }


  get f() { return this.reqPatientMedicinesHomeDeliveryForm.controls; }

  pharmacistChangeEvent($event) {
    let newArray = this.pharmacistListDataArray.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.reqPatientMedicinesHomeDeliveryForm.patchValue(
        {
          pharmacistID:newArray[0]._id
        } )   
      }
  }

  medicineChangeEvent($event) {
    let newArray = this.medicineListDataArray.filter(function (item) {
      return item.medicineName == $event.target.value;
    });
    if (newArray) {
      this.reqPatientMedicinesHomeDeliveryForm.patchValue(
        {
          medicineID:newArray[0]._id
        }
      )
    }
  }
  

  Request_PatientMedicinesHomeDelivery() {
    this.submitted = true;
    if (this.reqPatientMedicinesHomeDeliveryForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.reqPatientMedicinesHomeDeliveryForm.value;
    dataobj["appointmentID"]=this.appointmentid;
    this._apiservice.Request_PatientMedicinesHomeDelivery(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_MedicinesList() {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj).subscribe(data => {
      if (data) {
        this.medicineListDataArray = data;
        console.log("medicineListDataArray ", data);

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_PharmacistsList() {
    let dataobj = {
    };
    this._apiservice. Get_PharmacistsList(dataobj).subscribe(data => {
      if (data) {
        console.log("pharmacistListDataArray ", data);
        this.pharmacistListDataArray = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


}

