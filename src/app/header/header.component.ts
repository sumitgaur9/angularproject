import { Component, OnInit } from '@angular/core';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppEnum } from 'src/app/shared/app.enum';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  unsubscribe;
  public showHelpAndSupportPopup = false;
  public isUserLoggedIn = false;
  public currentLoggedUserData: any = {};
  public username = "";
  public errorMessage: string = '';
  public showRequestPatMedHomeDelivery: boolean = false;
  public showPharmacistVisitCompleteIntimation: boolean = false;
  public showVisitForAll: boolean = false;
  public showChangePasswordPopup: boolean = false;
  public currentUser;
  public nameFirstChar: string = '';
  public showDoctorProfilePopup: boolean = false;
  public showpatientformpopup: boolean = false;
  public showpharmacistformpopup: boolean = false;
  public shownurseprofileformpopup: boolean = false;
  public showphyscoprofileformpopup: boolean = false;
  public showlabtechnicianprofileformpopup: boolean = false;
  public showConfirmationPopup;
  public getpatientprofileid: string = '';
  public getdoctorprofileid: string = '';
  public getpharmacistprofileid: string = '';
  public getnurseprofileid: string = '';
  public getphyscoprofileid: string = '';
  public getlabtechnicianprofileid: string = '';
  public cartInfoData:any=[];
  public cartInfoCount:number=0;
  public cartDataFromSessionStorage:any=[];

  constructor(private utilityservice: UtililtyFunctions, private router: Router, private _apiservice: APIService, private toastr: ToastrService) {
    this.unsubscribe = this.utilityservice.onLoginSuccessfully.subscribe(() => {
      let userSubs = this.utilityservice.isUserLoggedIn();
      if (userSubs && userSubs != null) {
        this.isUserLoggedIn = true;
        this.currentLoggedUserData = userSubs.user;
        this.username = userSubs.user.name;
        this.userme();
      } else {
        this.isUserLoggedIn = false;
        this.currentLoggedUserData = {};
        this.username = '';
      }
    });

    this.utilityservice.addIntoCart.subscribe((dataobj) => {
      if (dataobj) {
        console.log("addIntoCart", dataobj);
       let comingDataExistInCart =false;
       if(this.cartInfoData.length>0)
       {
         comingDataExistInCart = this.CheckMedIdAlreadyExistInCart(dataobj);
       }
       if(comingDataExistInCart==false)
       {
        this.cartInfoData.push(dataobj);
        this.Save_AddtoCart(dataobj);
       }
       else
       {
        this.toastr.warning("This item has already added in the cart,Please select another item")
       }
        sessionStorage.setItem("sessionCartData", JSON.stringify(this.cartInfoData));    
      }
    });

    
    this.utilityservice.subRemoveFromCart.subscribe((dataobj) => {
      this.cartInfoData=dataobj;
      sessionStorage.setItem("sessionCartData", JSON.stringify(this.cartInfoData));    
    });


  }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.cartDataFromSessionStorage = JSON.parse(window.sessionStorage.getItem("sessionCartData"));
    if (this.currentUser != undefined) {
      this.username = this.currentUser.user.name;
      this.nameFirstChar = this.currentUser.user.name ? this.currentUser.user.name.substr(0, 1) : '';
      this.nameFirstChar = this.nameFirstChar.toUpperCase();
    }
    if(this.cartDataFromSessionStorage)
    {
      this.cartInfoData=this.cartDataFromSessionStorage;
      // setTimeout(() => {
      // //  this.utilityservice.subOnCartDetailPage.next(this.cartInfoData);
      // }, 10);
    }
    else{
      this.Get_CartDetails();
    }
  }

  logout() {
    let dataparam: any = {};
    this._apiservice.logout(dataparam).subscribe(data => {
      // if (data) {
      this.router.navigate(['/login']);
      // }
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }
  userme() {
    let dataparam: any = {};
    this._apiservice.userme(dataparam).subscribe(data => {
      console.log("userme data is this", JSON.stringify(data));
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  public closeRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
  }

  public openRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }
  public closePharmacistVisitCompleteIntimation() {
    this.showPharmacistVisitCompleteIntimation = false;
    $('#showPharmacistVisitCompleteIntimationModal').modal('hide');
  }

  public openPharmacistVisitCompleteIntimation() {
    this.showPharmacistVisitCompleteIntimation = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showPharmacistVisitCompleteIntimationModal').modal('show');
    }, 100);
  }
  public closeshowVisitForAll() {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
  }

  public openShowVisitForAll() {
    this.showVisitForAll = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeChangePasswordPopup() {
    this.showChangePasswordPopup = false;
    $('#showChangePasswordPopup').modal('hide');
  }

  public openChangePasswordPopup() {
    this.showChangePasswordPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showChangePasswordPopup').modal('show');
    }, 100);
  }


  showSuccess() {
    this.toastr.success('thanks for being my friend mr gauri');
  }

  navigatetopage(menuname) {
    switch (menuname) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'doctorlist':
        this.router.navigate(['/doctorlist']);
        break;
      case 'patientlist':
        this.router.navigate(['/patientlist']);
        break;
      case 'nurselist':
        this.router.navigate(['/nurselist']);
        break;
      case 'pharmacistlist':
        this.router.navigate(['/pharmacistlist']);
        break;
      case 'physcotherapistlist':
        this.router.navigate(['/physcotherapistlist']);
        break;
      case 'login':
        this.logout();
        this.router.navigate(['/login']);
        break;
      case 'otherlinks':
        this.router.navigate(['/otherlinks']);
        break;
      case 'ReqPatientMedHomeDel':
        this.openRequestPatMedHomeDelivery();
        break;
      case 'PharmaVisitCompleteIntimation':
        this.openPharmacistVisitCompleteIntimation();
        break;
      case 'visitforall':
        this.openShowVisitForAll();
        break;
      case 'cartdetail':
        this.router.navigate(['/cartdetail']);
      //   setTimeout(() => {
      //  //   this.utilityservice.subOnCartDetailPage.next(this.cartInfoData);
      //   }, 10);
        break;
        
      case 'logo':
        let userSubs = this.utilityservice.isUserLoggedIn();
        if (userSubs.user && userSubs.user.tokens != null) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
        break;
    }
  }


  public openProfilePopup() {
    if (this.currentUser.user.role == 1) {
      this.openDoctorProfilePopup();
    }
    else if (this.currentUser.user.role == 2) {
      this.openNurseProfilePopup();
    }
    else if (this.currentUser.user.role == 3) {
      this.openPhysiosProfilePopup();
    }
    else if (this.currentUser.user.role == 4) {
      this.openPharmacistProfilePopup();
    }
    else if (this.currentUser.user.role == 5) {
      this.openLabTechProfilePopup();
    }
    else if (this.currentUser.user.role < 1) {
      this.openPatientProfilePopup();
    }
  }

  public closeDoctorProfilePopup(calllistapi) {
    this.showDoctorProfilePopup = false;
    $('#showDoctorProfilePopup').modal('hide');
  }

  public openDoctorProfilePopup() {
    this.getdoctorprofileid = this.currentUser.roleBaseId;
    this.showDoctorProfilePopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showDoctorProfilePopup').modal('show');
    }, 100);
  }

  public closePatientProfilePopup(calllistapi) {
    this.showpatientformpopup = false;
    $('#showpatientformpopup').modal('hide');
  }

  public openPatientProfilePopup(id?) {
    this.getpatientprofileid = this.currentUser.roleBaseId;
    this.showpatientformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpatientformpopup').modal('show');
    }, 100);
  }

  public closePharmacistProfilePopup(calllistapi) {
    this.showpharmacistformpopup = false;
    $('#showpharmacistformpopup').modal('hide');
  }

  public openPharmacistProfilePopup() {
    this.getpharmacistprofileid = this.currentUser.roleBaseId;
    this.showpharmacistformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpharmacistformpopup').modal('show');
    }, 100);
  }

  public closeNurseProfilePopup(calllistapi) {
    this.shownurseprofileformpopup = false;
    $('#shownurseprofileformpopup').modal('hide');
  }

  public openNurseProfilePopup() {
    this.getnurseprofileid = this.currentUser.roleBaseId;
    this.shownurseprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#shownurseprofileformpopup').modal('show');
    }, 100);
  }

  public closePhysiosProfilePopup(calllistapi) {
    this.showphyscoprofileformpopup = false;
    $('#showphyscoprofileformpopup').modal('hide');

  }

  public openPhysiosProfilePopup(id?) {
    this.getphyscoprofileid = this.currentUser.roleBaseId;
    this.showphyscoprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showphyscoprofileformpopup').modal('show');
    }, 100);
  }

  public closeLabTechProfilePopup(calllistapi) {
    this.showlabtechnicianprofileformpopup = false;
    $('#showlabtechnicianprofileformpopup').modal('hide');
  }

  public openLabTechProfilePopup(id?) {
    this.getlabtechnicianprofileid = this.currentUser.roleBaseId;
    this.showlabtechnicianprofileformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showlabtechnicianprofileformpopup').modal('show');
    }, 100);
  }


  ngOnDestroy() {
    // this.unsubscribe.unsubscribe();
  }

  patientProfileResponseReturn(value)
  {
    //no use here but used in bookappointment and booklabtest
  }

  CheckMedIdAlreadyExistInCart(checkwithdata)
  {
      let newArray =this.cartInfoData.filter(function (item) {
        return item.itemID == checkwithdata.itemID;
      });
      if (newArray && newArray.length>0) {
      return true;
      }
      return false;
    
  }



  Get_CartDetails() {
    let dataobj = {
    };
    this._apiservice.Get_CartDetails(dataobj,this.currentUser.roleBaseId).subscribe(data => {
      if (data) {
        this.cartInfoData=data;
        sessionStorage.setItem("sessionCartData", JSON.stringify(this.cartInfoData));    

      // setTimeout(() => {
      //   this.utilityservice.subOnCartDetailPage.next(this.cartInfoData);
      // }, 10);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Save_AddtoCart(itemInfo) {
    let dataobj: any = {};
    dataobj.itemID = itemInfo.itemID;
    dataobj.itemName = itemInfo.itemName;
    dataobj.companyName = itemInfo.companyName;
    dataobj.price = itemInfo.price;
    dataobj.qty = itemInfo.qty;
    dataobj.paymentTypeEnumKey = itemInfo.paymentTypeEnumKey;
    dataobj.paymentTypeEnumValue = itemInfo.paymentTypeEnumValue;
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


}
