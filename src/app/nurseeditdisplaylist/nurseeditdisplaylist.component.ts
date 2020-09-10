import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;
@Component({
  selector: 'app-nurseeditdisplaylist',
  templateUrl: './nurseeditdisplaylist.component.html',
  styleUrls: ['./nurseeditdisplaylist.component.css']
})
export class NurseeditdisplaylistComponent implements OnInit {

  shownurseprofileformpopup = false;
  public errorMessage: string = '';
  public patientListData: any = [];
  public currentUser;
  public getnurseprofileid:string='';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_NursesList();
  }

  public closeNurseProfilePopup() {
    this.shownurseprofileformpopup = false;
    $('#shownurseprofileformpopup').modal('hide');
    this.Get_NursesList();
  }

  public openNurseProfilePopup(id?) {
    this.getnurseprofileid=id;
    this.shownurseprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#shownurseprofileformpopup').modal('show');
    }, 100);
  }

  Get_NursesList() {
    let dataobj = {
    };
    this._apiservice.Get_NursesList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_NurseProfile(id) {
    let dataobj = {
    };
    this._apiservice.Delete_Nurse(dataobj,id).subscribe(data => {
      if (data) {
        this.toastr.success('doctor deleted successfully');
        this.Get_NursesList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }


}
