
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-labtechniciandashboard',
  templateUrl: './labtechniciandashboard.component.html',
  styleUrls: ['./labtechniciandashboard.component.css']
})
export class LabtechniciandashboardComponent implements OnInit {


  public labTestBookingData:any=[];

  public errorMessage;
  public currentUser;

  public showUploadReport:boolean=false;
public uploadreportdatainput:any={};  



  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));

    console.log("this.currentUser this.currentUser ",this.currentUser )
    this.Get_LabTestsBookings();
  
  }
 //Get_AppointmentsByDocID
 public closeshowUploadReport() {
  this.showUploadReport = false;
  $('#showUploadReportModal').modal('hide');
}

public openUploadReport(data) {
  this.showUploadReport = true;
  console.log("data is this",data);
this.uploadreportdatainput.bookLabTestId=data._id;
this.uploadreportdatainput.labTechnicanID=this.currentUser.roleBaseId;
this.uploadreportdatainput.labTechnicanName='labtech';

  setTimeout(() => {
    $(window).scrollTop(0);
    $('#showUploadReportModal').modal('show');
  }, 100);
}

  
  Get_LabTestsBookings() {
    let dataobj:any = {}
    this._apiservice.Get_LabTestsBookings(dataobj).subscribe(data => {
      if (data) {
        this.labTestBookingData = data.filter(function (item) {
          return item.isCollectionCollected == true;
        });
        console.log("  this.labTestBookingData  this.labTestBookingData",  this.labTestBookingData)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  



}


