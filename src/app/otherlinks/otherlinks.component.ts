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



  public openDoctorDashboard() {
    this.router.navigate(['/doctordashboard']);
  }

  public openPharmacistDashboard() {
    this.router.navigate(['/pharmacistdashboard']);
  }

}
