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
  public currentUser;
  public getphyscoprofileid:string='';
  

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));

    this.Get_PhysiosList();
  }

  public closePhysiosProfilePopup() {
    this.showphyscoprofileformpopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
  }

  public openPhysiosProfilePopup(id) {
    this.getphyscoprofileid=id;
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
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  
  Delete_PhysioProfile(id) {
    let dataobj = {
    };
    this._apiservice.Delete_Physio(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('doctor deleted successfully');
        this.Get_PhysiosList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}
