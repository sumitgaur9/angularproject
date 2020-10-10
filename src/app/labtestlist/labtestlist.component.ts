import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-booklabtest',
  templateUrl: './labtestlist.component.html',
  styleUrls: ['./labtestlist.component.css']
})
export class LablistComponent implements OnInit {

  showForgotPasswordtPopup = false;
  public errorMessage: string = '';
  public labTestData: any = [];
  public currentUser;
  public showConfirmationPopup: boolean = false;
  public showData = 'Do you really want to delete these records? This process cannot be undone.';
  public showLabTestProfilePopup: boolean = false;
  public getbookedlabtestid: string = '';
  public labTestBasketData: any = [];
  public labTestBasketTotalPriceCount: number = 0;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_LabTestsList();
  }

  public closeForgotPasswordPopup() {
    this.showForgotPasswordtPopup = false;
    $('#forgotPasswordModal').modal('hide');
  }

  public openDoctorProfilePopup() {
    this.showForgotPasswordtPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#forgotPasswordModal').modal('show');
    }, 100);
  }

  Get_LabTestsList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsList(dataobj).subscribe(data => {
      if (data) {
        this.labTestData = data;
        this.labTestData.forEach(element => {
          element.isAddedInCart=false;
        });
        this.checkDataInSessionStorageOnInit();   //this  function call  is here because need to update add basket text
     
     
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_LabTest(id) {
    let dataobj = {
    };
    this._apiservice.Delete_LabTest(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Lab Test deleted successfully');
        this.Get_LabTestsList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  public openDeleteConfirmationPopup(id) {
    this.getbookedlabtestid = id;
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
      this.Delete_LabTest(this.getbookedlabtestid);
    }
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  redirectToCartDetailPage() {
    this.router.navigate(['/cartdetail']);
  }

  public closeLabTestProfilePopup(calllistapi) {
    this.showLabTestProfilePopup = false;
    $('#showLabTestProfilePopup').modal('hide');
    if (calllistapi) {
      this.Get_LabTestsList();
    }
  }

  public openLabTestProfilePopup(id?) {
    this.getbookedlabtestid = id;
    this.showLabTestProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showLabTestProfilePopup').modal('show');
    }, 100);
  }

  disablityCheckoutButton() {
    if (this.labTestBasketData.length > 0) {
      $('.checkout-btn-blue').css({ "cursor": "pointer" });
      $('.checkout-btn-blue').css({ "background": "#0CB6E1" });
      $('.checkout-btn-blue').css({ "border": "1px solid #0CB6E1" });

    } else {
      $('.checkout-btn-blue').css({ "cursor": "not-allowed" });
      $('.checkout-btn-blue').css({ "background": "#CBCBCB" });
      $('.checkout-btn-blue').css({ "border": "1px solid #CBCBCB" });
    }
  }


  addToCart(labtestInfo) {
    let dataobj: any = {};
    dataobj.itemID = labtestInfo._id;
    dataobj.itemName = labtestInfo.testName;
    dataobj.companyName = '';
    dataobj.price = labtestInfo.price;
    dataobj.qty = 1;
    dataobj.paymentTypeEnumKey = AppEnum.paymentType.LabTest;
    dataobj.paymentTypeEnumValue = "LabTest"
    dataobj.userId = this.currentUser.roleBaseId;
    var modifycartdata = Object.assign({}, dataobj);
    this.utilityservice.addIntoCart.next(modifycartdata);
    this.labTestBasketData.push(modifycartdata);
    this.disablityCheckoutButton();
    this.getPriceTotal();
    // this.Save_AddtoCart(modifycartdata);
  }

  Save_AddtoCart(medicineInfo) {
    let dataobj: any = {};
    dataobj.itemID = medicineInfo.itemID;
    dataobj.itemName = medicineInfo.itemName;
    dataobj.companyName = medicineInfo.companyName;
    dataobj.price = medicineInfo.price;
    dataobj.qty = medicineInfo.qty;
    dataobj.paymentTypeEnumKey = AppEnum.paymentType.LabTest;;
    dataobj.paymentTypeEnumValue = "LabTest"
    dataobj.userId = this.currentUser.roleBaseId;
    this._apiservice.Save_AddtoCart(dataobj).subscribe(data => {
      if (data) {
        // this.toastr.success('Saved Sucessfully');
      }
    }, error => {
      if (error.error.code === 11000) {
        this.errorMessage = error.error.errmsg; this.toastr.error(this.errorMessage);
      } else {
        this.errorMessage = error.error.message; this.toastr.error(this.errorMessage);
      }
    });
  }

  getPriceTotal() {
    this.labTestBasketTotalPriceCount = 0;
    for (var i = 0; i < this.labTestBasketData.length; i++) {
      //this.labTestBasketData[i].isAddedInCart=true;
      this.labTestBasketTotalPriceCount = this.labTestBasketTotalPriceCount + this.labTestBasketData[i].price;
      this.textChangeAddToBAsketToGoToBasket(this.labTestBasketData[i]);
    }
  }

  textChangeAddToBAsketToGoToBasket(dataobj)
  {
    if (dataobj) {
      let newArray = this.labTestData.filter(function (item) {
        return item._id == dataobj.itemID
      });
      if (newArray) {
        let index = this.labTestData.findIndex(x => x._id === newArray[0]._id);
        this.labTestData[index].isAddedInCart=true;
       //isAddedInCart
      }
    }
  }

  
  bookNow(labtestInfo) {
    let cartInfo = JSON.parse(window.sessionStorage.getItem("sessionCartData"));
    let newArray = cartInfo.filter(function (item) {
      return item.itemID == labtestInfo._id;
    });
    if (newArray && newArray.length > 0) {
      this.redirectToCartDetailPage();
    }
    else {
      this.addToCart(labtestInfo)
      this.redirectToCartDetailPage();
    }
  }

  CheckItemIdAlreadyExistInCart(labtestInfo) {
    let cartInfo = JSON.parse(window.sessionStorage.getItem("sessionCartData"));
    let newArray = cartInfo.filter(function (item) {
      return item.itemID == labtestInfo._id;
    });
    if (newArray && newArray.length > 0) {
      this.redirectToCartDetailPage();
      // this.toastr.warning("This item has already added in the cart,Please select another item")
       
    } else {
      this.addToCart(labtestInfo)
    }
  }

  checkDataInSessionStorageOnInit()
  {
    let cartInfo = JSON.parse(window.sessionStorage.getItem("sessionCartData"));
    if (cartInfo) {
      let newArray = cartInfo.filter(function (item) {
        return item.paymentTypeEnumKey == AppEnum.paymentType.LabTest;
      });
      if (newArray) {
        this.labTestBasketData = newArray;
        this.disablityCheckoutButton();
        this.getPriceTotal();
        console.log("this.labTestBasketDatathis.labTestBasketData", this.labTestBasketData);
      }
    }
  }
}

