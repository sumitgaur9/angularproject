

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
  selector: 'app-doctoreditdisplaylist.',
  templateUrl: './doctoreditdisplaylist.component.html',
  styleUrls: ['./doctoreditdisplaylist.component.css']
})
export class DoctorEditdisplaylistComponent implements OnInit {

  public menuID: AppEnum.appListMenu;
  public gridDataCols: any;
  public pageheading: string = '';
  public btnNewName: string = '';
  public popuptitle: string;
  public showDoctorProfilePopup = false;
  showForgotPasswordtPopup = false;
  showConfirmationPopup = false;
  public errorMessage: string = '';
  public showData='Do you really want to delete these records? This process cannot be undone.';
  public doctorListData: any = [];
  public currentUser;
  public   searchText;
  public getdoctorprofileid:string='';
  public getDefaultImage=defaultImage.doctorlink;
  public expertiesArrayData:any=[];
  public completeDoctorListData:any=[];

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.menuID = AppEnum.appListMenu.Doctor;
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    console.log("currentUsercurrentUser", this.currentUser);
    this.Get_DoctorsList();
    this.Get_ExpertiseList();

  }
 

  public closeDoctorProfilePopup(calllistapi) {
    this.showDoctorProfilePopup = false;
    $('#showDoctorProfilePopup').modal('hide');
    if(calllistapi)
    {
      this.Get_DoctorsList();
    }
  }

  public openDoctorProfilePopup(id?) {
    this.getdoctorprofileid=id;
    this.showDoctorProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showDoctorProfilePopup').modal('show');
    }, 100);
  }

  public deleteDoctorProfilePopup(id) {
    this.getdoctorprofileid = id;
    this.openAttendancePopup();
  }

  
  openAttendancePopup() {
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
      this.Delete_Doctor(this.getdoctorprofileid);
    }
  }

  // markUserAttendance(){
  //   this.showConfirmationPopup = false;
  //   $('#confirmationModal').modal('hide');  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }


  Delete_Doctor(id) {
    let dataobj = {
    };
    this._apiservice.Delete_Doctor(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('doctor deleted successfully');
        this.Get_DoctorsList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }




  Get_DoctorsList() {
    let dataobj = {
    };
    this._apiservice.Get_DoctorsList(dataobj).subscribe(data => {
      if (data) {
        this.doctorListData = data;
        this.completeDoctorListData=data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_ExpertiseList() {
    let dataobj = {
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList", data);
        this.expertiesArrayData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  

  expertiesChangeEvent(value) {
    this.doctorListData = this.completeDoctorListData.filter(function (item) {
      return item.experties == value;
    });
  }



}
