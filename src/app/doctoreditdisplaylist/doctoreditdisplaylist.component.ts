

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

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
  public errorMessage: string = '';
  public doctorListData: any = [];
  public currentUser;

  public getdoctorprofileid:string='';

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.menuID = AppEnum.appListMenu.Doctor;
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    console.log("currentUsercurrentUser", this.currentUser);
    this.Get_DoctorsList();
    //  this.pageInitailization();

  }


  pageInitailization() {
    switch (this.menuID) {
      case AppEnum.appListMenu.Doctor:
        this.menuID = AppEnum.appListMenu.Doctor;
        this.gridDataCols = this.prepareGridColumn(this.menuID);
        this.pageheading = "Doctor";
        this.btnNewName = "Doctor";
        //this.FillDisplayList();
        break;
    }
    this.popuptitle = this.pageheading;
  }


  prepareGridColumn(value) {
    switch (this.menuID) {
      case AppEnum.appListMenu.Doctor:
        var gridItemSpecTypeDataColsItem = [
        ];
        return gridItemSpecTypeDataColsItem;
        break;

    }
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
    this.Delete_Doctor(id);
  }

  


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

        // this.toastr.success('thanks to being a part of our platform');
        //  this.CloseModal();
        // this.router.navigate(['/doctorlist']);
        //   if (data.token && data.token != "" && data.token != null) {
        //     let datainput: any = {};
        //    // this.router.navigate(['/home']);
        // //    this.utilityservice.onLoginSuccessfully.next();
        //   }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }





}
