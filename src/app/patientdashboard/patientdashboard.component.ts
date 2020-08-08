import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {

  public doctorAppointmentListData: any = [];
  public doctorAppointmentHistoryData: any = [];
  public showRequestPatMedHomeDelivery:boolean=false;

  public errorMessage;
  public showVisitForAll: boolean = false;
  public visitAppointmentId: string = '';

  public expertiesArrayData:any=[];
  public patientAppointmentData:any=[];

  public doctorExperties = new FormGroup({
    experties: new FormControl(""),
  });

  public filterDoctorData:any=[];


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_AppointmentsByPatientID();
    this.Get_ExpertiseList();
  }

  //Get_AppointmentsByDocID
  public closeshowVisitForAll() {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
  }

  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    this.visitAppointmentId = data._id;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
  }

  public openRequestPatMedHomeDelivery(data) {
    this.showRequestPatMedHomeDelivery = true;
    this.showVisitForAll = true;
    this.visitAppointmentId = data._id;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }


  Get_AppointmentsByPatientID() {
    let dataobj = {
    };
    let doctorid = "5f2e69e9afc7cc00045f7ccf";
    this._apiservice.Get_AppointmentsByPatientID(dataobj, doctorid).subscribe(data => {
      if (data) {
      this.patientAppointmentData=data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  expertiesChangeEvent($event) {
this.Get_FilteredDoctors($event.target.value);

  }
  
  Get_ExpertiseList() {
    let dataobj={
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList",data);
        this.expertiesArrayData=data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  Get_FilteredDoctors(experties) {
    let dataobj = {};
    this._apiservice.Get_FilteredDoctors(dataobj, experties).subscribe(data => {
      if (data) {
        console.log("filterDoctorData ", data);
        this.filterDoctorData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  public openGetLabTest() {
    this.router.navigate(['/getlabtest']);
  }
  



}

