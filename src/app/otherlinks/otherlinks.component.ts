import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-otherlinks',
  templateUrl: './otherlinks.component.html',
  styleUrls: ['./otherlinks.component.css']
})
export class OtherlinksComponent implements OnInit {


  public showDiseasMasterPopup:boolean=false;
  public showExpertiesMasterPopup:boolean=false;

  public showMedicineMasterPopup:boolean=false;

  public showBookAppointmentPopup:boolean=false;

  public showCreateLabTestMasterPopup:boolean=false;

  public showCreateLabTestPopup:boolean=false;

public showCreateLabTestPackageMasterPopup:boolean=false;
public showCreateBookLabTestPopup:boolean=false;



  constructor(private router: Router) { }

  ngOnInit() {
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


  public closeBookAppointmentPopup() {
    this.showBookAppointmentPopup = false;
    $('#showphyscoprofileformpopup').modal('hide');
  }

  public openBookAppointmentPopup() {
    this.showBookAppointmentPopup = true;
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


  public closeCreateLabTestMaster() {
    this.showCreateLabTestMasterPopup = false;
    $('#showCreateLabTestMasterPopup').modal('hide');
  }

  public openCreateLabTestMaster() {
    this.showCreateLabTestMasterPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showCreateLabTestMasterPopup').modal('show');
    }, 100);
  }
  public closeCreateLabTestPackageMaster() {
    this.showCreateLabTestPackageMasterPopup = false;
    $('#showCreateLabTestPackageMasterPopup').modal('hide');
  }

  public openCreateLabTestPackageMaster() {
    this.showCreateLabTestPackageMasterPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showCreateLabTestPackageMasterPopup').modal('show');
    }, 100);
  }


  public closeCreateBookLabTestMaster() {
    this.showCreateBookLabTestPopup = false;
    $('#showCreateBookLabTestPopup').modal('hide');
  }

  public openCreateBookLabTestMaster() {
    this.showCreateBookLabTestPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showCreateBookLabTestPopup').modal('show');
    }, 100);
  }


  public openDoctorDashboard() {
    this.router.navigate(['/doctordashboard']);
  }

  public openPharmacistDashboard() {
    this.router.navigate(['/pharmacistdashboard']);
  }
  public openPatientDashboard() {
    this.router.navigate(['/patientdashboard']);
  }

  public openGetLabTest() {
    this.router.navigate(['/getlabtest']);
  }
  

}
