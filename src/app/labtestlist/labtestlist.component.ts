import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-booklabtest',
  templateUrl: './labtestlist.component.html',
  styleUrls: ['./labtestlist.component.css']
})
export class LablistComponent implements OnInit {

  showForgotPasswordtPopup = false;
  public errorMessage: string = '';
  public labTestData: any = [];
  public currentUser;
  public showConfirmationPopup: boolean = false;
  public showData = 'Do you really want to delete these records? This process cannot be undone.';
  public showLabTestProfilePopup: boolean = false;
  public getbookedlabtestid: string = '';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_LabTestsList();
  }

  public closeForgotPasswordPopup() {
    this.showForgotPasswordtPopup = false;
    $('#forgotPasswordModal').modal('hide');
  }

  public openDoctorProfilePopup() {
    this.showForgotPasswordtPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#forgotPasswordModal').modal('show');
    }, 100);
  }

  Get_LabTestsList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsList(dataobj).subscribe(data => {
      if (data) {
        this.labTestData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_LabTest(id) {
    let dataobj = {
    };
    this._apiservice.Delete_LabTest(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Lab Test deleted successfully');
        this.Get_LabTestsList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  public openDeleteConfirmationPopup(id) {
    this.getbookedlabtestid = id;
    this.openConfirmationPopup();
  }


  openConfirmationPopup() {
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
      this.Delete_LabTest(this.getbookedlabtestid);
    }
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  public closeLabTestProfilePopup(calllistapi) {
    this.showLabTestProfilePopup = false;
    $('#showLabTestProfilePopup').modal('hide');
    if (calllistapi) {
      this.Get_LabTestsList();
    }
  }

  public openLabTestProfilePopup(id?) {
    this.getbookedlabtestid = id;
    this.showLabTestProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showLabTestProfilePopup').modal('show');
    }, 100);
  }

}

