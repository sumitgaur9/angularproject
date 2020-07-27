import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;

@Component({
  selector: 'app-physcotherapisteditdisplaylist',
  templateUrl: './physcotherapisteditdisplaylist.component.html',
  styleUrls: ['./physcotherapisteditdisplaylist.component.css']
})
export class PhyscotherapisteditdisplaylistComponent implements OnInit {

  showphyscoprofileformpopup = false;
  public errorMessage: string = '';
  public patientListData: any = [];

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_PhysiosList();
  }

  public closePatientProfilePopup() {
    this.showphyscoprofileformpopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
  }

  public openPatientProfilePopup() {
    this.showphyscoprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showphyscoprofileformpopup').modal('show');
    }, 100);
  }

  Get_PhysiosList() {
    let dataobj = {
    };
    this._apiservice.Get_PhysiosList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}