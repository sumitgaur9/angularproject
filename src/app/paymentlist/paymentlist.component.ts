
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from '../shared/api.constant';

declare var $: any;


@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent implements OnInit {

  public paymentListData: any = [];
  public currentUser;
  public errorMessage: string = '';
  public PaymentEnumTypeArray: any = [{ "id": 1, "name": "BookAppointment" },
  { "id": 2, "name": "LabTest" }, { "id": 3, "name": "Medicine" },
  { "id": 4, "name": "MedicineLabTest" }]

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_PaymentLists();
  }

  Get_PaymentLists(paymentTypeEnumKey?) {
    let dataobj = {
    };
    this._apiservice.Get_PaymentLists(dataobj, paymentTypeEnumKey).subscribe(data => {
      if (data) {
        this.paymentListData = data;
        console.log("Get_PaymentLists ", data);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  paymentTypeChangeEvent(value) {
    if(value!="Select PaymentType")
    {
      this.Get_PaymentLists(value);
    }
  }
}

