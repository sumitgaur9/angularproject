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
  selector: 'app-cartdetailpage',
  templateUrl: './cartdetailpage.component.html',
  styleUrls: ['./cartdetailpage.component.css']
})


export class CartdetailpageComponent implements OnInit {

  public currentUser;
  public cartDetailPageInfo: any = [];
  public tempCartDetailPageInfo: any = [];
  public cartPriceTotal: number = 0;
  public errorMessage: string = '';
  public cartDataFromSessionStorage:any=[];

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) {
    // this.utilityservice.subOnCartDetailPage.subscribe((dataobj) => {
    //   if (dataobj) {
    //     this.tempCartDetailPageInfo = dataobj;
    //     this.addedSomeExtraFieldInCartInfo();
    //     console.log("this.tempCartDetailPageInfo", this.tempCartDetailPageInfo);
    //   }
    // });

  }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.cartDataFromSessionStorage = JSON.parse(window.sessionStorage.getItem("sessionCartData"));
    if(this.cartDataFromSessionStorage)
    {
    this.tempCartDetailPageInfo=this.cartDataFromSessionStorage;
    this.addedSomeExtraFieldInCartInfo();
      // setTimeout(() => {
      //   this.utilityservice.subOnCartDetailPage.next(this.cartInfoData);
      // }, 10);
    }
  }


  addedSomeExtraFieldInCartInfo() {
    this.cartDetailPageInfo = [];
    for (var i = 0; i < this.tempCartDetailPageInfo.length; i++) {
      let dataobj: any = {};
      dataobj = this.tempCartDetailPageInfo[i];
      dataobj.orignalPrice = this.tempCartDetailPageInfo[i].price;
      this.cartDetailPageInfo.push(dataobj);
    }
    this.getPriceTotal();
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  getPriceTotal() {
    this.cartPriceTotal = 0;
    for (var i = 0; i < this.cartDetailPageInfo.length; i++) {
      this.cartPriceTotal = this.cartPriceTotal + this.cartDetailPageInfo[i].price;
    }
  }

  qtyChange(qty, data) {
    let newArray = this.cartDetailPageInfo.filter(function (item) {
      return item.itemID == data.itemID;
    });
    if (newArray && newArray.length > 0) {
      let index = this.cartDetailPageInfo.findIndex(x => x.itemID === newArray[0].itemID);
      this.cartDetailPageInfo[index].price = qty * this.cartDetailPageInfo[index].orignalPrice;
      this.getPriceTotal();
    }
  }


  reduceQtyByOne(data) {
    if (data.qty >= 1) {
      data.qty = (data.qty) - 1;
      this.qtyChange(data.qty, data);
    }
  }
  addQtyByOne(data) {
    data.qty++;
    this.qtyChange(data.qty, data);
  }


  checkOutBtnClick() {
    let data = {};
    let paymentTypeEnumKey;
    let paymentTypeEnumValue;;
    this.router.navigate(['/paymentpage']);
    let itemFromMedicineList = this.cartDetailPageInfo.filter(function (item) {
      return item.paymentTypeEnumKey == AppEnum.paymentType.Medicine;
    });
    let itemFromLabTestist = this.cartDetailPageInfo.filter(function (item) {
      return item.paymentTypeEnumKey == AppEnum.paymentType.LabTest;
    });
    
    if (itemFromMedicineList && itemFromMedicineList.length > 0 && itemFromLabTestist && itemFromLabTestist.length > 0) {
      paymentTypeEnumKey=AppEnum.paymentType.MedicineLabTest;
      paymentTypeEnumValue="MedicineLabTest";
    }
    else if (itemFromMedicineList && itemFromMedicineList.length > 0) {
      paymentTypeEnumKey=AppEnum.paymentType.Medicine;
      paymentTypeEnumValue="Medicine";
    }
    else if (itemFromLabTestist && itemFromLabTestist.length > 0) {
      paymentTypeEnumKey=AppEnum.paymentType.LabTest;
      paymentTypeEnumValue="LabTest";
    }
    setTimeout(() => {
      var dataobj: any = {};
      dataobj.charges = this.cartPriceTotal;
      dataobj.disease = '';
      dataobj["paymentTypeEnumKey"] = paymentTypeEnumKey;
      dataobj["paymentTypeEnumValue"] =paymentTypeEnumValue;
      dataobj["localUIOrderID"] = '';
      this.utilityservice.preparePaymentDetailsData.next(dataobj);
    }, 10);
  }

  RemoveCartDetails(itemID) {
    let dataobj = {
    };
    this._apiservice.RemoveCartDetails(dataobj, this.currentUser.roleBaseId, itemID).subscribe(data => {
      if (data) {
        this.toastr.success('Item deleted successfully');
        this.removeDataFromCartArray(itemID);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  removeDataFromCartArray(itemID) {
    let newArray = this.cartDetailPageInfo.filter(function (item) {
      return item.itemID == itemID;
    });
    if (newArray && newArray.length > 0) {
      let index = this.cartDetailPageInfo.findIndex(x => x.itemID === newArray[0].itemID);
      this.cartDetailPageInfo.splice(index, 1);
      this.utilityservice.subRemoveFromCart.next(this.cartDetailPageInfo);
      //subRemoveFromCart
      this.getPriceTotal();
    }
  }

  
}


