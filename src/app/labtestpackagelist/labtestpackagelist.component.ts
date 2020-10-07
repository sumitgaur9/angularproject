

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;

@Component({
  selector: 'app-labtestpackagelist',
  templateUrl: './labtestpackagelist.component.html',
  styleUrls: ['./labtestpackagelist.component.css']
})
export class LabtestpackagelistComponent implements OnInit {

  showForgotPasswordtPopup = false;
  public errorMessage: string = '';
  public labTestData: any = [];
  public currentUser;
  public showConfirmationPopup: boolean = false;
  public getlabtestpackageid: string = '';
  public showLabTestPackageProfilePopup: boolean = false;
  public showData = 'Do you really want to delete these records? This process cannot be undone.';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_LabTestsPackageList();
  }

  Get_LabTestsPackageList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsPackageList(dataobj).subscribe(data => {
      if (data) {
        this.labTestData = data;
        console.log("this.labTestData=data;this.labTestData=data;", this.labTestData)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_LabTestsPackage(id) {
    let dataobj = {
    };
    this._apiservice.Delete_LabTestsPackage(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Lab Test Package deleted successfully');
        this.Get_LabTestsPackageList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  redirectToCartDetailPage(){
    this.router.navigate(['/cartdetail']);
  }

  public openDeleteConfirmationPopup(id) {
    this.getlabtestpackageid = id;
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
      this.Delete_LabTestsPackage(this.getlabtestpackageid);
    }
  }

  public closeLabTestPackageProfilePopup(calllistapi) {
    this.showLabTestPackageProfilePopup = false;
    $('#showLabTestPackageProfilePopup').modal('hide');
    if (calllistapi) {
      this.Get_LabTestsPackageList();
    }
  }

  public openLabTestPackageProfilePopup(id?) {
    this.getlabtestpackageid = id;
    this.showLabTestPackageProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showLabTestPackageProfilePopup').modal('show');
    }, 100);
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }
}

