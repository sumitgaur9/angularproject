

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

declare var $: any;

@Component({
  selector: 'app-labtestpackagelist',
  templateUrl: './labtestpackagelist.component.html',
  styleUrls: ['./labtestpackagelist.component.css']
})
export class LabtestpackagelistComponent implements OnInit {

  showForgotPasswordtPopup = false;
  public errorMessage: string = '';
  public labTestData: any = [];
  public currentUser;
  public showConfirmationPopup: boolean = false;
  public getlabtestpackageid: string = '';
  public showLabTestPackageProfilePopup: boolean = false;
  public showData = 'Do you really want to delete these records? This process cannot be undone.';
  public labTestBasketData: any = [];
  public labTestBasketTotalPriceCount: number = 0;
  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_LabTestsPackageList();

  }

  Get_LabTestsPackageList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsPackageList(dataobj).subscribe(data => {
      if (data) {
        this.labTestData = data;
        this.labTestData.forEach(element => {
          element.isAddedInCart=false;
        });
        this.checkDataInSessionStorageOnInit();   
        console.log("this.labTestData=data;this.labTestData=data;", this.labTestData)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Delete_LabTestsPackage(id) {
    let dataobj = {
    };
    this._apiservice.Delete_LabTestsPackage(dataobj, id).subscribe(data => {
      if (data) {
        this.toastr.success('Lab Test Package deleted successfully');
        this.Get_LabTestsPackageList();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  redirectToCartDetailPage(){
    this.router.navigate(['/cartdetail']);
  }

  public openDeleteConfirmationPopup(id) {
    this.getlabtestpackageid = id;
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
      this.Delete_LabTestsPackage(this.getlabtestpackageid);
    }
  }

  public closeLabTestPackageProfilePopup(calllistapi) {
    this.showLabTestPackageProfilePopup = false;
    $('#showLabTestPackageProfilePopup').modal('hide');
    if (calllistapi) {
      this.Get_LabTestsPackageList();
    }
  }

  public openLabTestPackageProfilePopup(id?) {
    this.getlabtestpackageid = id;
    this.showLabTestPackageProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showLabTestPackageProfilePopup').modal('show');
    }, 100);
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  
  }

  addToCart(labtestInfo) {
    let dataobj: any = {};
    dataobj.itemID = labtestInfo._id;
    dataobj.itemName = labtestInfo.packageNname;
    dataobj.companyName = '';
    dataobj.price = labtestInfo.packageAmount;
    dataobj.qty = 1;
    dataobj.paymentTypeEnumKey = AppEnum.paymentType.LabTestPackage;
    dataobj.paymentTypeEnumValue = "LabTestPackage"
    dataobj.userId = this.currentUser.roleBaseId;
    var modifycartdata = Object.assign({}, dataobj);
    this.utilityservice.addIntoCart.next(modifycartdata);
    this.labTestBasketData.push(modifycartdata);
    this.disablityCheckoutButton();
    this.getPriceTotal();
    // this.Save_AddtoCart(modifycartdata);
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
  Save_AddtoCart(medicineInfo) {
    let dataobj: any = {};
    dataobj.itemID = medicineInfo.itemID;
    dataobj.itemName = medicineInfo.itemName;
    dataobj.companyName = medicineInfo.companyName;
    dataobj.price = medicineInfo.price;
    dataobj.qty = medicineInfo.qty;
    dataobj.paymentTypeEnumKey = AppEnum.paymentType.LabTestPackage;;
    dataobj.paymentTypeEnumValue = "LabTestPackage"
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
        return item.paymentTypeEnumKey == AppEnum.paymentType.LabTestPackage;
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

