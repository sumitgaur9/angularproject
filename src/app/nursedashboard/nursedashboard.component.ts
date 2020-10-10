import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-nursedashboard',
  templateUrl: './nursedashboard.component.html',
  styleUrls: ['./nursedashboard.component.css']
})
export class NursedashboardComponent implements OnInit {

  public labTestBookingData: any = [];
  public errorMessage;
  public currentUser;
  public showVisitForAll: boolean = false;
  public bookLabTestId: string = '';
  public visitAppointmentId: string = '';
  public patientname: string = '';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_LabTestsBookings();
  }

  public closeshowVisitForAll(value) {
    if (value) {
      this.Get_LabTestsBookings();
    }
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
  }

  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    console.log("data is this", data);
    this.visitAppointmentId = '';
    this.bookLabTestId = data._id;
    this.patientname = data.patientNname;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }
  Get_LabTestsBookings() {
    let dataobj: any = {}
    if (this.currentUser.user.role != 11) {
        dataobj.nurseID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_LabTestsBookings(dataobj).subscribe(data => {
      if (data) {
        this.labTestBookingData = data;
        console.log("this.labTestBookingDatathis.labTestBookingData",this.labTestBookingData);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}

