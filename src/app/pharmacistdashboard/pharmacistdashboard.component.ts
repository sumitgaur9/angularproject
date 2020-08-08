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

  public doctorAppointmentListData:any=[];
  public doctorAppointmentHistoryData:any=[];

  public showPharmacistVisitCompleteIntimation:boolean=false;
  public errorMessage;
  public showVisitForAll:boolean=false;
  public visitAppointmentId:string='';

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.Get_PharmaReqByPhamacistID();
  }

  


  public closePharmacistVisitCompleteIntimation() {
    this.showPharmacistVisitCompleteIntimation = false;
    $('#showPharmacistVisitCompleteIntimationModal').modal('hide');
  }
  
  public openPharmacistVisitCompleteIntimation(data) {
    this.showPharmacistVisitCompleteIntimation = true;
      this.visitAppointmentId = data._id;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPharmacistVisitCompleteIntimationModal').modal('show');
    }, 100);
  }

  Get_PharmaReqByPhamacistID() {
    let dataobj={
    };
    let pharmacistID="5f255d7bbb2631000488c8b0";
    this._apiservice.Get_PharmaReqByPhamacistID(dataobj,pharmacistID).subscribe(data => {
      if (data) {
        //this.doctorAppointmentListData=data;
        console.log("  this.doctorAppointmentListData",data);
        
        this.doctorAppointmentListData = data.filter(function (item) {
          return item.isPharmacyProvided == false;
        });

        this.doctorAppointmentHistoryData = data.filter(function (item) {
          return item.isPharmacyProvided == true;
        });

      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
  
}

