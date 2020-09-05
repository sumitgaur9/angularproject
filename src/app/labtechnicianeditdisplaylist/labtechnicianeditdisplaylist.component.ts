import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;
@Component({
  selector: 'app-labtechnicianeditdisplaylist',
  templateUrl: './labtechnicianeditdisplaylist.component.html',
  styleUrls: ['./labtechnicianeditdisplaylist.component.css']
})
export class LabtechnicianeditdisplaylistComponent implements OnInit {

  showlabtechnicianprofileformpopup = false;
  public errorMessage: string = '';
  public labTechListData: any = [];
  public currentUser;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_LabTechniciansList();
  }

  public closeLabTechProfilePopup() {
    this.showlabtechnicianprofileformpopup = false;
    $('#showlabtechnicianprofileformpopup').modal('hide');
  }

  public openLabTechProfilePopup() {
    this.showlabtechnicianprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showlabtechnicianprofileformpopup').modal('show');
    }, 100);
  }

  Get_LabTechniciansList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTechniciansList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.labTechListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  // Delete_NurseProfile(id) {
  //   let dataobj = {
  //   };
  //   this._apiservice.Delete_Nurse(dataobj,id).subscribe(data => {
  //     if (data) {
  //       this.toastr.success('doctor deleted successfully');
  //       this.Get_LabTechniciansList();
  //     }
  //   }, error => {
  //     this.errorMessage = error.error.message; this.toastr.error(error.error.message);
  //   });
  // }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }
}

