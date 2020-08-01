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

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_PatientsList();
  }

  public closeNurseProfilePopup() {
    this.shownurseprofileformpopup = false;
    $('#shownurseprofileformpopup').modal('hide');
  }

  public openNurseProfilePopup() {
    this.shownurseprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#shownurseprofileformpopup').modal('show');
    }, 100);
  }

  Get_PatientsList() {
    let dataobj = {
    };
    this._apiservice.Get_NursesList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
