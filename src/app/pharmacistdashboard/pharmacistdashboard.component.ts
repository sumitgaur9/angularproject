

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-pharmacistdashboard',
  templateUrl: './pharmacistdashboard.component.html',
  styleUrls: ['./pharmacistdashboard.component.css']
})
export class PharmacistdashboardComponent implements OnInit {

  public doctorAppointmentListData: any = [];
  public currentUser;
  public showPharmacistVisitCompleteIntimation: boolean = false;
  public errorMessage;
  public showVisitForAll: boolean = false;
  public visitAppointmentId: string = '';
  public inputPharmacistVisitCompleteIntimationModal: any = {};

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_PharmaReqForHomeDel();
  }

  public closePharmacistVisitCompleteIntimation() {
    this.showPharmacistVisitCompleteIntimation = false;
    $('#showPharmacistVisitCompleteIntimationModal').modal('hide');
    this.Get_PharmaReqForHomeDel();
  }

  public openPharmacistVisitCompleteIntimation(data) {
    this.showPharmacistVisitCompleteIntimation = true;
    this.visitAppointmentId = data.appointmentID;
    this.inputPharmacistVisitCompleteIntimationModal = data;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPharmacistVisitCompleteIntimationModal').modal('show');
    }, 100);
  }

  Get_PharmaReqForHomeDel() {
    let dataobj:any={};
    if (this.currentUser.user.role != 11) {
      dataobj = {
        pharmacistID: this.currentUser.roleBaseId
      };
    }
    this._apiservice.Get_PharmaReqForHomeDel(dataobj).subscribe(data => {
      if (data) {
        console.log("  this.doctorAppointmentListData", data);
        this.doctorAppointmentListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}