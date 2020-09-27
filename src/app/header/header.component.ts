import { Component, OnInit } from '@angular/core';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { APIService } from 'src/app/service/api.service';
import { ToastrService } from 'ngx-toastr';
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
  public showSaveImageForWebPopup: boolean = false;
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
  }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    if (this.currentUser != undefined) {
      this.username = this.currentUser.user.name;
      this.nameFirstChar = this.currentUser.user.name ? this.currentUser.user.name.substr(0, 1) : '';
      this.nameFirstChar = this.nameFirstChar.toUpperCase();
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

  public closeSaveImageForWebPopup() {
    this.showSaveImageForWebPopup = false;
    $('#showSaveImageForWebPopup').modal('hide');
  }

  public openSaveImageForWebPopup() {
    this.showSaveImageForWebPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showSaveImageForWebPopup').modal('show');
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
}
