
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;

@Component({
  selector: 'app-patienteditdisplaylist',
  templateUrl: './patienteditdisplaylist.component.html',
  styleUrls: ['./patienteditdisplaylist.component.css']
})
export class PatienteditdisplaylistComponent implements OnInit {

  public menuID:AppEnum.appListMenu;
  public gridDataCols:any;
  public pageheading:string='';
  public btnNewName:string='';
  public popuptitle:string;
  showpatientformpopup = false;
  public errorMessage:string='';
  public doctorListData:any=[];


  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.menuID = AppEnum.appListMenu.Doctor;
this.Get_PatientsList();
  //  this.pageInitailization();

}


pageInitailization() {
  switch (this.menuID) {
      case AppEnum.appListMenu.Doctor:
          this.menuID = AppEnum.appListMenu.Doctor;
          this.gridDataCols = this.prepareGridColumn(this.menuID);
          this.pageheading ="Doctor";
          this.btnNewName = "Doctor";
          //this.FillDisplayList();
          break;
  }
  this.popuptitle = this.pageheading;
}


prepareGridColumn(value) {
  switch(this.menuID)
  {
    case AppEnum.appListMenu.Doctor:
      var gridItemSpecTypeDataColsItem = [
          ];
      return gridItemSpecTypeDataColsItem;
      break;

}
}


public closeForgotPasswordPopup() {
  this.showpatientformpopup = false;
  $('#showpatientformpopup').modal('hide');
}

public openForgotPasswordPopup() {
  this.showpatientformpopup = true;
  setTimeout(() => {
    $(window).scrollTop(0);
    $('#showpatientformpopup').modal('show');
  }, 100);
}


Get_PatientsList() {
  let dataobj={
  };
  this._apiservice.Get_PatientsList(dataobj).subscribe(data => {
    if (data) {
      console.log("daa is ",data);
      this.doctorListData=data;

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
    this.errorMessage = error.error.message;
  });
}

}
