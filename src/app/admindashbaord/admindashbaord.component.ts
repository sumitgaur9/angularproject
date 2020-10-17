import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;
@Component({
  selector: 'app-admindashbaord',
  templateUrl: './admindashbaord.component.html',
  styleUrls: ['./admindashbaord.component.css']
})
export class AdmindashbaordComponent implements OnInit {

  public currentUser;
  uploadPrescriptiondata;
  errorMessage;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));    
    this.Get_UploadPrescriptionForMedicineApprovalsList();
  }

  Get_UploadPrescriptionForMedicineApprovalsList() {
    let dataobj = {}
    this._apiservice.Get_UploadPrescriptionForMedicineApprovalsList(dataobj).subscribe(data => {
      if (data) {
        this.uploadPrescriptiondata = data;
        console.log("  this.uploadPrescriptiondata  this.uploadPrescriptiondata", this.uploadPrescriptiondata)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}
