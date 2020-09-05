

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
  showForgotPasswordtPopup = false;
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


  public closeForgotPasswordPopup() {
    this.showForgotPasswordtPopup = false;
    $('#forgotPasswordMssodal').modal('hide');
  }

  public openDoctorProfilePopup(id?) {
    this.getdoctorprofileid=id;
    this.showForgotPasswordtPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#forgotPasswordModal').modal('show');
    }, 100);
  }

  public deleteDoctorProfilePopup(id) {
    this.Delete_Doctor(id);
  }

  arrayBufferToBase64( buffer ) {
    // return this.utli.arrayBufferToBase64(arrayBufferToBase64);
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:image/jpg;base64,'+window.btoa( binary );
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
