import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {

  public doctorAppointmentListData: any = [];
  public doctorAppointmentHistoryData: any = [];
  public showRequestPatMedHomeDelivery:boolean=false;

  public errorMessage;
  public showVisitForAll: boolean = false;
  public visitAppointmentId: string = '';
  public patientname:string='';
  public inputrequesPatMedHomeDelivery:any={
    patientNname:'',
    patientMob:'',
    patientPIN:'',
    patientAddres:'',
  }

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_AppointmentsByDocID();
  }

  //Get_AppointmentsByDocID
  public closeshowVisitForAll() {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
    this.Get_AppointmentsByDocID();
  }

  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    console.log("data is this",data);
    this.visitAppointmentId = data._id;
    this.patientname = data.patientNname;

    
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
    this.Get_AppointmentsByDocID();
  }

  public openRequestPatMedHomeDelivery(data) {
    this.showRequestPatMedHomeDelivery = true;
    this.visitAppointmentId = data._id;
    console.log("data is this",data);

    this.inputrequesPatMedHomeDelivery.patientNname=data.patientNname;
    this.inputrequesPatMedHomeDelivery.patientMob=data.patientMob;
    this.inputrequesPatMedHomeDelivery.patientPIN=data.patientPIN;
    this.inputrequesPatMedHomeDelivery.patientAddres=data.patientAddres;

    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }


  Get_AppointmentsByDocID() {
    let dataobj = {
    };
    let doctorid = "5f268ed2b7335a0004fcd325";
    this._apiservice.Get_AppointmentsByDocID(dataobj, doctorid).subscribe(data => {
      if (data) {
        this.doctorAppointmentListData = data.filter(function (item) {
          return item.isVisitCompleted == false;
        });
        this.doctorAppointmentHistoryData = data.filter(function (item) {
          return item.isVisitCompleted == true;
        });
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
