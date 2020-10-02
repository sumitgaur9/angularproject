import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
import { SingleDataSet,MultiDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
declare var $: any;

@Component({
  selector: 'app-patientdashboard',
  templateUrl: './patientdashboard.component.html',
  styleUrls: ['./patientdashboard.component.css']
})
export class PatientdashboardComponent implements OnInit {

  public doctorAppointmentListData: any = [];
  public doctorAppointmentHistoryData: any = [];
  public showRequestPatMedHomeDelivery: boolean = false;

  public errorMessage;
  public showVisitForAll: boolean = false;
  public showBookAppointmentPopup: boolean = false;
  public visitAppointmentId: string = '';

  public expertiesArrayData: any = [];
  public patientAppointmentData: any = [];

  public doctorExperties = new FormGroup({
    experties: new FormControl(""),
  });
  public currentUser;
  public filterDoctorData: any = [];

  public labTestBookingData:any=[];

  
  public commonDashBoardCountData:any={
    total_no_of_doctors:0,
    total_no_of_nurses:0,
    total_no_of_patients:0,
    total_no_of_pharmacists:0,
  };

  public diseaseWiseApptCount:any;
  public medicineWiseApptCount:any;
  public pharmacistWiseApptCount:any;

  public doctorWiseApptCount:any;
  public labTestWiseTestCount:any;

  public individualToPackageLabTestCount:any;


  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  // public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  // public pieChartData: SingleDataSet = [300, 500, 100];

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  //public pieChartColors = ["#ff9900","#ff9900","#97bbcd","#97bbcd"]; 

  public pieChartColor:any = [
    {
      backgroundColor: ['#157fda',
      '#39b49b',
      'rgba(139, 136, 136, 0.9)',
      'rgba(255, 161, 181, 0.9)',
      'rgba(255, 102, 0, 0.9)'
      ]
    }
]

  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartPharmacistLabels: Label[] = [];
  public pieChartPharmacistData: SingleDataSet = [];


  public pieChartIndividualToPackageLabTestCountLabels: Label[] = ['individualTestCount','packageCount'];
  public pieChartIndividualToPackageLabTestCountData: SingleDataSet = [];


  IndividualToPackageLabTestCount
  //second

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

 
  //third


  public doughnutChartLabels: Label[] = ['individualTestCount','packageCount'];
  public doughnutChartData: SingleDataSet = [
   
  ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_AppointmentsByPatientID();
    this.Get_ExpertiseList();

    this.Get_CommonDashboardCount();
     this.Get_LabTestWiseTestCount();
     this.Get_DoctorWiseApptCount();
     this.Get_IndividualToPackageLabTestCount();
     this.Get_LabTestsBookings();
  }

  //Get_AppointmentsByDocID
  public closeshowVisitForAll() {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
  }

  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    this.visitAppointmentId = data._id;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
  }

  public openRequestPatMedHomeDelivery(data) {
    this.showRequestPatMedHomeDelivery = true;
    this.showVisitForAll = true;
    this.visitAppointmentId = data._id;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }

  public closeBookAppointmentPopup() {
    this.showBookAppointmentPopup = false;
    $('#showBookAppointmentPopup').modal('hide');
    this.Get_AppointmentsByPatientID();
  }

  public openBookAppointmentPopup() {
    this.showBookAppointmentPopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showBookAppointmentPopup').modal('show');
    }, 100);
  }



  Get_AppointmentsByPatientID() {
    let dataobj = {
    };
    let patientID='';
    if(this.currentUser.user.role!=11)
    {
      patientID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_AppointmentsByPatientID(dataobj, patientID).subscribe(data => {
      if (data) {
        this.patientAppointmentData = data;
        console.log("this.patientAppointmentData",this.patientAppointmentData)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  expertiesChangeEvent($event) {
    this.Get_FilteredDoctors($event.target.value);

  }

  Get_ExpertiseList() {
    let dataobj = {
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList", data);
        this.expertiesArrayData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_FilteredDoctors(experties) {
    let dataobj = {};
    this._apiservice.Get_FilteredDoctors(dataobj, experties).subscribe(data => {
      if (data) {
        console.log("filterDoctorData ", data);
        this.filterDoctorData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  public openGetLabTest() {
    this.router.navigate(['/getlabtest']);
  }


  Get_CommonDashboardCount() {
    let dataobj = {}
    this._apiservice.Get_CommonDashboardCount(dataobj).subscribe(data => {
      if (data) {
        this.commonDashBoardCountData=data;
        console.log("  this.commonDashBoardCountData  this.commonDashBoardCountData",  this.commonDashBoardCountData)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  

  Get_LabTestWiseTestCount() {
    let dataobj = {
    };
    let patientid = this.currentUser.roleBaseId;//"5f2fa8d88c2e60000478f67c"; 
    this._apiservice.Get_LabTestWiseTestCount(dataobj,patientid).subscribe(data => {
      if (data) {
        this.labTestWiseTestCount=data;
        if(this.labTestWiseTestCount && this.labTestWiseTestCount.length>0)
        {
          for(var i=0;i<this.labTestWiseTestCount.length;i++)
          {
            this.pieChartPharmacistLabels.push(this.labTestWiseTestCount[i].testName);
            if(i==1)
            {
              this.pieChartPharmacistData.push(4);

            }
            else
            {
              this.pieChartPharmacistData.push(this.labTestWiseTestCount[i].testCount);
            }
          }
        }
      
        console.log("  this.labTestWiseTestCount  this.labTestWiseTestCount",  this.labTestWiseTestCount)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Get_DoctorWiseApptCount() {
    let dataobj = {
    };
    let patientID='';
    if(this.currentUser.user.role!=11)
    {
      patientID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_DoctorWiseApptCount(dataobj,patientID).subscribe(data => {
      if (data) {
        this.doctorWiseApptCount=data;
        if(this.doctorWiseApptCount && this.doctorWiseApptCount.length>0)
        {
          for(var i=0;i<this.doctorWiseApptCount.length;i++)
          {
            this.pieChartLabels.push(this.doctorWiseApptCount[i].doctorName);
            if(i==1)
            {
              this.pieChartData.push(4);
            }
            else
            {
              this.pieChartData.push(this.doctorWiseApptCount[i].apptCount);
            }
          }
        }
        console.log("  this.doctorWiseApptCount  this.doctorWiseApptCount",  this.doctorWiseApptCount)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
  


  
  Get_IndividualToPackageLabTestCount() {
    let dataobj = {
    };
    let patientid =this.currentUser.roleBaseId;// "5f2fa8d88c2e60000478f67c";
    this._apiservice.Get_IndividualToPackageLabTestCount(dataobj,patientid).subscribe(data => {
      if (data) {
        this.individualToPackageLabTestCount=data;
        if(this.individualToPackageLabTestCount)
        {

          // this.pieChartIndividualToPackageLabTestCountData.push(this.individualToPackageLabTestCount.individualTestCount);
          // this.pieChartIndividualToPackageLabTestCountData.push(this.individualToPackageLabTestCount.packageCount);

          this.doughnutChartData.push(4);
          this.doughnutChartData.push(8);

          this.pieChartIndividualToPackageLabTestCountData.push(4);
          this.pieChartIndividualToPackageLabTestCountData.push(8);
        }
        console.log("  this.individualToPackageLabTestCount  this.individualToPackageLabTestCount",  this.individualToPackageLabTestCount)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Get_LabTestsBookings() {
    let dataobj:any = {}
    dataobj.patientID=this.currentUser.roleBaseId;
    this._apiservice.Get_LabTestsBookings(dataobj).subscribe(data => {
      if (data) {
        this.labTestBookingData = data.filter(function (item) {
          return item.isReportGenerated == true;
        });
        console.log("this.labTestBookingDatathis.labTestBookingData",this.labTestBookingData);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_UploadedTestReportbyLabTestID(booklabtestid) {
    let dataobj = {
    };
    this._apiservice.Get_UploadedTestReportbyLabTestID(dataobj, booklabtestid).subscribe(data => {
    console.log(data);
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
  makePayment(appointmentData)
  {
    let data={};
    this.router.navigate(['/paymentpage']);
    setTimeout(() => {
      var dataobj:any={};
      dataobj=appointmentData;
      dataobj["paymentTypeEnumKey"]=1;
      dataobj["paymentTypeEnumValue"]="BookAppointment";
      dataobj["localUIOrderID"]=appointmentData._id;
      this.utilityservice.preparePaymentDetailsData.next(appointmentData);
    }, 10);
  }
}

  




