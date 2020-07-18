

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

declare var $: any;


@Component({
  selector: 'app-doctoreditdisplaylist.',
  templateUrl: './doctoreditdisplaylist.component.html',
  styleUrls: ['./doctoreditdisplaylist.component.css']
})
export class DoctorEditdisplaylistComponent implements OnInit {

  public menuID:AppEnum.appListMenu;
  public gridDataCols:any;
  public pageheading:string='';
  public btnNewName:string='';
  public popuptitle:string;
  showForgotPasswordtPopup = false;


  constructor() { }

  ngOnInit() {
    this.menuID = AppEnum.appListMenu.Doctor;

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
  this.showForgotPasswordtPopup = false;
  $('#forgotPasswordModal').modal('hide');
}

public openForgotPasswordPopup() {
  this.showForgotPasswordtPopup = true;
  setTimeout(() => {
    $(window).scrollTop(0);
    $('#forgotPasswordModal').modal('show');
  }, 100);
}



}
