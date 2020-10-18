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
  requestId='';
  public showConfirmationPopup:boolean =false;
  public showData='Do you really want to APPROVE this Medicine Requeest.';

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

  Save_ApproveMedicineReqUsingPrescription(requestId) {
    let dataobj = {
      requestId : requestId,
      approvalDate : this.utilityservice.ToDisplayDateFormat(new Date()),
    }
    this._apiservice.Save_ApproveMedicineReqUsingPrescription(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('Request Approved successfully');
        this.Get_UploadPrescriptionForMedicineApprovalsList()
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  openAttendancePopup(data) {
    this.requestId = data._id;
    this.showData = "Are you sure, you want to approve request for " + data.medicineName + "manufactured by " +data.companyName +"?"
    this.showConfirmationPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#confirmationModal').modal('show');
    }, 100);
  }

  closeConfirmationPopup(updateListRequired: boolean = false) {
    this.showConfirmationPopup = false;
    $('#confirmationModal').modal('hide');
    if (updateListRequired) {
      this.Save_ApproveMedicineReqUsingPrescription(this.requestId);
    }
  }




}
