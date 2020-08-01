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

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  
  public reqPatientMedicinesHomeDeliveryForm = new FormGroup({
    patientName: new FormControl(""),
    medicineName: new FormControl(""),
    patientContactNo: new FormControl(""),
  });

  public passwordPatternError = false;

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  }


  get f() { return this.reqPatientMedicinesHomeDeliveryForm.controls; }

 
  

  Request_PatientMedicinesHomeDelivery() {
    this.submitted = true;
    if (this.reqPatientMedicinesHomeDeliveryForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.reqPatientMedicinesHomeDeliveryForm.value;
    this._apiservice.Request_PatientMedicinesHomeDelivery(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
    //    this.router.navigate(['/doctorlist']);
      //   if (data.token && data.token != "" && data.token != null) {
      //     let datainput: any = {};
      //    // this.router.navigate(['/home']);
      // //    this.utilityservice.onLoginSuccessfully.next();
      //   }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}

