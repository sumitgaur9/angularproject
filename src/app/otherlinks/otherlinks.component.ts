import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

@Component({
  selector: 'app-otherlinks',
  templateUrl: './otherlinks.component.html',
  styleUrls: ['./otherlinks.component.css']
})
export class OtherlinksComponent implements OnInit {

  public errorMessage: string = '';
  public showDiseasMasterPopup: boolean = false;
  public showExpertiesMasterPopup: boolean = false;
  public showSaveImageForWebPopup: boolean = false;
  public showMedicineMasterPopup: boolean = false;
  public showBookAppointmentPopup: boolean = false;
  public showCreateLabTestPopup: boolean = false;
  public showSaveBookLabTestPopup: boolean = false;
  public showChangePasswordPopup: boolean = false;

  public currentUser;

  /****************for image********************* */
  public testimageform = new FormGroup({
    image: new FormControl("")
  });
  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  }

  uploadFile(fileInput) {
    if (fileInput.length === 0) {
      return;
    }
    this.uploadResult = "";
    this.UploadFile = <Array<File>>fileInput.target.files;
    this.UploadFileName = this.UploadFile[0].name;
  }

  public closeBookAppointmentPopup() {
    this.showBookAppointmentPopup = false;
    $('#showBookAppointmentPopup').modal('hide');
  }

  public openBookAppointmentPopup() {
    this.showBookAppointmentPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showBookAppointmentPopup').modal('show');
    }, 100);
  }

  public closeDiseasMasterPopup() {
    this.showDiseasMasterPopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
  }

  public openDiseasMasterPopup() {
    this.showDiseasMasterPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showphyscoprofileformpopup').modal('show');
    }, 100);
  }

  public closeExpertiesMasterPopup() {
    this.showExpertiesMasterPopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
  }

  public openExpertiesMasterPopup() {
    this.showExpertiesMasterPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showphyscoprofileformpopup').modal('show');
    }, 100);
  }

  public closeMedicineMaster() {
    this.showMedicineMasterPopup = false;
    $('#showMedicineMasterPopup').modal('hide');
  }

  public openMedicineMaster() {
    this.showMedicineMasterPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showMedicineMasterPopup').modal('show');
    }, 100);
  }

  public openPharmacistDashboard() {
    this.router.navigate(['/pharmacistdashboard']);
  }

  public openPatientDashboard() {
    this.router.navigate(['/patientdashboard']);
  }

  public openDoctorDashboard() {
    this.router.navigate(['/doctordashboard']);
  }

  public openGetLabTest() {
    this.router.navigate(['/getlabtest']);
  }
  public openGetLabPackageTest() {
    this.router.navigate(['/getlabtestpackagelist']);
  }

  public closeSaveBookLabTestMaster() {
    this.showSaveBookLabTestPopup = false;
    $('#showSaveBookLabTestPopup').modal('hide');
  }

  public openSaveBookLabTestMaster() {
    this.showSaveBookLabTestPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showSaveBookLabTestPopup').modal('show');
    }, 100);
  }

  public openNurseDashboard() {
    this.router.navigate(['/nursedashboard']);
  }

  public openLabTechnicianList() {
    this.router.navigate(['/labtechnician']);
  }

  public openLabTechnicianDashboard() {
    this.router.navigate(['/labtechniciandashboard']);
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

 

  Save_Image() {
    this.errorMessage = "";
    var formData = new FormData();
    formData.append('image', this.UploadFile[0], this.UploadFileName);
    this._apiservice.Save_Image(formData).subscribe(data => {
      if (data) {
        this.toastr.success('image save successfully');
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


}
