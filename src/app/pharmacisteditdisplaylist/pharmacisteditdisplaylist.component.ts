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
public currentUser;
public getpharmacistprofileid:string='';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));

    this.Get_PharmacistsList();
  }

  public closePatientProfilePopup() {
    this.showpharmacistformpopup = false;
    $('#showpharmacistformpopup').modal('hide');
    this.Get_PharmacistsList();

  }

  public openPatientProfilePopup(id?) {
    this.getpharmacistprofileid=id;
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
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  
  Delete_PharmacistProfile(id) {
    let dataobj = {
    };
    this._apiservice.Delete_Pharmacist(dataobj,id).subscribe(data => {
      if (data) {
        this.toastr.success('doctor deleted successfully');
        this.Get_PharmacistsList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

}
