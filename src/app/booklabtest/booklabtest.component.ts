import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;


@Component({
  selector: 'app-booklabtest.',
  templateUrl: './booklabtest.component.html',
  styleUrls: ['./booklabtest.component.css']
})
export class BooklabtestComponent implements OnInit {

  showForgotPasswordtPopup = false;
  public errorMessage:string='';
  public labTestData:any=[];
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
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
  let dataobj={
  };
  this._apiservice.Get_LabTestsList(dataobj,).subscribe(data => {
    if (data) {
      this.labTestData=data;
    }
  }, error => {
    this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  });
}

Delete_LabTest(id) {
  let dataobj = {
  };
  this._apiservice.Delete_LabTest(dataobj,id).subscribe(data => {
    if (data) {
      this.toastr.success('doctor deleted successfully');
      this.Get_LabTestsList();
    }
  }, error => {
    this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  });
}

}

