import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from '../shared/api.constant';

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
  showConfirmationPopup = false;
  public showData='Do you really want to delete these records? This process cannot be undone.';
  public getDefaultImage=defaultImage.physiolink;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));

    this.Get_PhysiosList();
  }

  public closePhysiosProfilePopup(calllistapi) {
    this.showphyscoprofileformpopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
    if(calllistapi)
    {
      this.Get_PhysiosList();
    }
  }

  public openPhysiosProfilePopup(id?) {
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
        this.toastr.success('Physiotherapist deleted successfully');
        this.Get_PhysiosList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }


  public openDeleteConfirmationPopup(id) {
    this.getphyscoprofileid = id;
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
      this.Delete_PhysioProfile(this.getphyscoprofileid);
    }
  }
}

