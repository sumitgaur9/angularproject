import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;

@Component({
  selector: 'app-pharmacisteditdisplaylist',
  templateUrl: './pharmacisteditdisplaylist.component.html',
  styleUrls: ['./pharmacisteditdisplaylist.component.css']
})
export class PharmacisteditdisplaylistComponent implements OnInit {

  showpharmacistformpopup = false;
  public errorMessage: string = '';
  public patientListData: any = [];

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_PharmacistsList();
  }

  public closePatientProfilePopup() {
    this.showpharmacistformpopup = false;
    $('#showpharmacistformpopup').modal('hide');
  }

  public openPatientProfilePopup() {
    this.showpharmacistformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpharmacistformpopup').modal('show');
    }, 100);
  }

  Get_PharmacistsList() {
    let dataobj = {
    };
    this._apiservice. Get_PharmacistsList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}