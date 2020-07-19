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

  constructor(private utilityservice: UtililtyFunctions, private router: Router, private _apiservice: APIService, private toastr: ToastrService) {
    this.unsubscribe = this.utilityservice.onLoginSuccessfully.subscribe(() => {
      let userSubs = this.utilityservice.isUserLoggedIn();
      if (userSubs && userSubs != null) {
        this.isUserLoggedIn = true;
        this.currentLoggedUserData = userSubs.user;
        this.username = userSubs.user.name;
      } else {
        this.isUserLoggedIn = false;
        this.currentLoggedUserData = {};
        this.username = '';
      }
    });


  }

  ngOnInit() {
    $('[data-toggle="popover"]').popover(); 
  }


  logout() {
    let dataparam: any = {};
    this._apiservice.logout(dataparam).subscribe(data => {
      // if (data) {
      this.showSuccess();
      localStorage.clear();
      this.router.navigate(['/login']);
      // }
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message;
      }
    });
  }


  showSuccess() {
    this.toastr.success('thanks for being my friend mr gauri');
  }

  navigatetopage(menuname) {
    switch (menuname) {
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
    }


  }

}
