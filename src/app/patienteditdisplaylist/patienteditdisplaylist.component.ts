
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant'

declare var $: any;

@Component({
  selector: 'app-patienteditdisplaylist',
  templateUrl: './patienteditdisplaylist.component.html',
  styleUrls: ['./patienteditdisplaylist.component.css']
})
export class PatienteditdisplaylistComponent implements OnInit {

  showpatientformpopup = false;
  public errorMessage: string = '';
  public patientListData: any = [];
  public currentUser;

  public getpatientprofileid:string='';
  showConfirmationPopup = false;
  public getDefaultImage=defaultImage.patientlink;

  public showData='Do you really want to delete these records? This process cannot be undone.';


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));

    this.Get_PatientsList();
  }

  public closePatientProfilePopup(calllistapi) {
    this.showpatientformpopup = false;
    $('#showpatientformpopup').modal('hide');
    if(calllistapi)
    {
      this.Get_PatientsList();
    }
  }

  public openPatientProfilePopup(id?) {
    if(id==undefined || id==null ||id=='')
    {
      this.getpatientprofileid =this.currentUser.roleBaseId;
    }
    else{
      this.getpatientprofileid=id;
    }
    this.showpatientformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpatientformpopup').modal('show');
    }, 100);
  }

  Get_PatientsList() {
    let dataobj = {
    };
    this._apiservice.Get_PatientsList(dataobj).subscribe(data => {
      if (data) {
        console.log("daa is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_PatientProfile(id) {
    let dataobj = {
    };
    this._apiservice.Delete_Patient(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Patient deleted successfully');
        this.Get_PatientsList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  public openDeleteConfirmationPopup(id) {
    this.getpatientprofileid = id;
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
      this.Delete_PatientProfile(this.getpatientprofileid);
    }
  }

  patientProfileResponseReturn(value)
  {
    //no use here but used in bookappointment and booklabtest
  }


}
