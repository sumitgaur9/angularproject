import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { RAZORPAY } from 'src/app/shared/api.constant';
import { WindowRefService } from '../window-ref.service';

declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [WindowRefService]

})
export class PaymentComponent implements OnInit {

  public submitted = false;
  errorMessage = '';

  public payableAmount;
  public order_id;
  public razorpay_payment_id;
  public razorpay_order_id;
  public razorpay_signature;
  public currentUserLoginResponse;
  public showPaymentSuccessPopup: boolean = false;
  public unsubscribe;
  public paymentform = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    amount: new FormControl(""),
    appointmentfor: new FormControl(""),
    paymentdate: new FormControl(""),
    //appointmentType: new FormControl(""),
    paymentTypeEnumKey: new FormControl(""),
    paymentTypeEnumValue: new FormControl(""),
    localUIOrderID: new FormControl(""),
  });

  ngOnInit() {
    this.currentUserLoginResponse = JSON.parse(window.sessionStorage.getItem("userToken"));//role not coming in userme api so need to take value from both storage because patient all info come in userme not in login response
    this.paymentform.patchValue({
      name: this.currentUserLoginResponse.user.name,
      email: this.currentUserLoginResponse.user.email,
      paymentdate: this.utilityservice.ToDBDateFormat(new Date())
    });
  }
  constructor(private router: Router, private winRef: WindowRefService, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) {
    this.utilityservice.preparePaymentDetailsData.subscribe((dataobj) => {
      if (dataobj) {
        console.log("preparePaymentDetailsDatapreparePaymentDetailsData", dataobj);
        this.paymentform.patchValue({
          amount: dataobj.charges,
          appointmentfor: dataobj.disease,
         // appointmentType: dataobj.appointmentType,  //homevisit/online
          paymentTypeEnumKey: dataobj.paymentTypeEnumKey,  //appointment or labtest enum id
          paymentTypeEnumValue: dataobj.paymentTypeEnumValue,  // //appointment or labtest enum name
          localUIOrderID: dataobj.localUIOrderID,// //appointment or labtest id 
        });
      }
    });
  }

  proceedToPay() {
     this.payableAmount=this.paymentform.controls.amount.value;
      this.initiatePaymentModal();
  }

  initiatePaymentModal() {
    let orderDetails = {
      amount: this.payableAmount,
      receipt: "receipt#1",
      currency: "INR"
    }
    this._apiservice.orders(orderDetails).subscribe(data => {
      if (data) {
        this.order_id = data.payload.id;
        console.log("Get_ExpertiseListGet_ExpertiseList", data);
        var rzp1 = new this.winRef.nativeWindow.Razorpay(this.preparePaymentDetails());
        rzp1.open();
        // event.preventDefault();
      }
    }, error => {
      console.log("TCL: CheckoutComponent -> initiatePaymentModal -> error", error)
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  preparePaymentDetails() {
    var ref = this;
    return {
      "key": RAZORPAY.KEY_ID, // Enter the Key ID generated from the Dashboard
      "amount": this.payableAmount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      // "name": 'Sumit Gaur',
      "name": this.paymentform.controls.name.value,
      "description": "Health Care",
      "currency": "INR",
      "order_id": this.order_id,//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      "image": '../../assets/images/icon-logo.png',
      "handler": function (response) {
        this.razorpay_payment_id = response.razorpay_payment_id;
        this.razorpay_order_id = response.razorpay_order_id;
        this.razorpay_signature = response.razorpay_signature;
        ref.handlePayment(response);
      //  window.history.back();
        console.log("Razorpay Payment Id is:", response.razorpay_payment_id);
        console.log("Razorpay Order Id is:", response.razorpay_order_id);
        console.log("Razorpay Signature is:", response.razorpay_signature);
      },
      "prefill": {
        "name": this.paymentform.controls.name.value,
        "email": this.paymentform.controls.email.value,
        // "name": `Sumit Gaur`,
        // "email": `sumitgaur92@yahoo.in`,
      },
      "theme": {
        "color": "#2874f0"
      }
    };
  }
  
  handlePayment(response) {
    let dataobj = {
      "razorpay_payment_id": response.razorpay_payment_id,
      "razorpay_order_id": response.razorpay_order_id,
      "razorpay_signature": response.razorpay_signature,
      "paymentTypeEnumKey": this.paymentform.controls.paymentTypeEnumKey.value,
      "paymentTypeEnumValue": this.paymentform.controls.paymentTypeEnumValue.value,
      "localUIOrderID": this.paymentform.controls.localUIOrderID.value,
      "patientEmail":this.currentUserLoginResponse.user.email,
    }
    this._apiservice.paymentverify(dataobj).subscribe(data => {
      if (data) {
        console.log("paymentverify", data);
        this.toastr.error("Payment done sucessfully");
      //  window.history.back();
      //this.router.navigate(['/home'])
       this.openPaymentSuccessPopup();
        this.RemoveCartDetails();

        // setTimeout(() => {
        //   this.openPaymentSuccessPopup();
        // }, 500);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  public closePaymentSuccessPopup() {
    this.showPaymentSuccessPopup = false;
    $('#showPaymentSuccessPopup').modal('hide');
    this.router.navigate(['/home'])
  }

  public openPaymentSuccessPopup() {
    this.showPaymentSuccessPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPaymentSuccessPopup').modal('show');
    }, 100);
  }

  cancelPayment()
  {
    window.history.back();
    //this.router.navigate(['/home'])
  }

  RemoveCartDetails() {
    let dataobj = {
    };
    this._apiservice.RemoveCartDetails(dataobj, this.currentUserLoginResponse.roleBaseId).subscribe(data => {
      if (data) {
        this.removeDataFromCartArray();
    
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  removeDataFromCartArray() {
    let blankCart:any=[];
    this.utilityservice.subRemoveFromCart.next(blankCart);
  }

}
