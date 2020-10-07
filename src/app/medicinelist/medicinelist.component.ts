

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
  selector: 'app-medicinelist',
  templateUrl: './medicinelist.component.html',
  styleUrls: ['./medicinelist.component.css']
})
export class MedicinelistComponent implements OnInit {

  public showMedicineprofileformpopup = false;
  public errorMessage: string = '';
  public medicineListDataArray: any = [];
  public currentUser;
  public getmedicineprofileid: string = '';

  showConfirmationPopup = false;
  public showData = 'Do you really want to delete these records? This process cannot be undone.';
  public getDefaultImage = defaultImage.medicinelink;


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_MedicinesList();
  }

  public closeMedicineProfilePopup(calllistapi) {
    this.showMedicineprofileformpopup = false;
    $('#showMedicineprofileformpopup').modal('hide');
    if (calllistapi) {
      this.Get_MedicinesList();
    }
  }


  public openMedicineProfilePopup(id?) {
    if (id == undefined || id == null || id == '') {
      this.getmedicineprofileid ='';
    }
    else {
      this.getmedicineprofileid = id;
    }
    this.showMedicineprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showMedicineprofileformpopup').modal('show');
    }, 100);
  }




  Get_MedicinesList(companyName?) {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj,companyName).subscribe(data => {
      if (data) {
        this.medicineListDataArray = data;
        console.log("medicineListDataArray ", data);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Delete_Medicine(id) {   //need medine del api
    let dataobj = {
    };
    this._apiservice.Delete_Medicine(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Medicine deleted successfully');
        this.Get_MedicinesList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }
  public openDeleteConfirmationPopup(id) {
    this.getmedicineprofileid = id;
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
      this.Delete_Medicine(this.getmedicineprofileid);
    }
  }


  addToCart(medicineInfo) {
    let dataobj: any = {};
    dataobj.itemID = medicineInfo._id;
    dataobj.itemName = medicineInfo.medicineName;
    dataobj.companyName = medicineInfo.companyName;
    dataobj.price = medicineInfo.price;
    dataobj.qty = 1;
    dataobj.paymentTypeEnumKey = AppEnum.paymentType.Medicine;;
    dataobj.paymentTypeEnumValue = "Medicine"
    dataobj.userId = this.currentUser.roleBaseId;
    dataobj.isAddedInCart = true;
    var modifycartdata = Object.assign({}, dataobj);
    this.utilityservice.addIntoCart.next(modifycartdata);
    //this.Save_AddtoCart(modifycartdata);
  }

  








}
