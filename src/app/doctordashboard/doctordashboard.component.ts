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
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {

  public doctorAppointmentListData: any = [];
  public doctorAppointmentHistoryData: any = [];
  public showRequestPatMedHomeDelivery:boolean=false;


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

public completeDoctorVisitData:any=[];



  public errorMessage;
  public showVisitForAll: boolean = false;
  public visitAppointmentId: string = '';
  public patientname:string='';
  public inputrequesPatMedHomeDelivery:any={
    patientNname:'',
    patientMob:'',
    patientPIN:'',
    patientAddres:'',
  }


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
        backgroundColor: ['rgba(30, 169, 224, 0.8)',
        'rgba(255,165,0,0.9)',
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


  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [
   
  ];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.Get_AppointmentsByDocID();
     monkeyPatchChartJsTooltip();
     monkeyPatchChartJsLegend();
     this.Get_CommonDashboardCount();
     this.Get_DiseaseWiseApptCount();
     this.Get_MedicineWiseApptCount();
     this.Get_PharmacistWiseApptCount();
  }

  //Get_AppointmentsByDocID
  public closeshowVisitForAll() {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
    this.Get_AppointmentsByDocID();
  }

  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    console.log("data is this",data);
    this.visitAppointmentId = data._id;
    this.patientname = data.patientNname;

    
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeRequestPatMedHomeDelivery() {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
    this.Get_AppointmentsByDocID();
  }

  public openRequestPatMedHomeDelivery(data) {
    this.showRequestPatMedHomeDelivery = true;
    this.visitAppointmentId = data._id;
    console.log("data is this",data);

    this.inputrequesPatMedHomeDelivery.patientNname=data.patientNname;
    this.inputrequesPatMedHomeDelivery.patientMob=data.patientMob;
    this.inputrequesPatMedHomeDelivery.patientPIN=data.patientPIN;
    this.inputrequesPatMedHomeDelivery.patientAddres=data.patientAddres;

    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }


  Get_AppointmentsByDocID() {
    let dataobj = {
    };
    let doctorid = "5f268ed2b7335a0004fcd325";
    this._apiservice.Get_AppointmentsByDocID(dataobj, doctorid).subscribe(data => {
      if (data) {
        this.completeDoctorVisitData=data;
        console.log("Get_AppointmentsByDocIDGet_AppointmentsByDocID",data)
        this.doctorAppointmentListData = data.filter(function (item) {
          return item.isVisitCompleted == false;
        });
        this.doctorAppointmentHistoryData = data.filter(function (item) {
          return item.isVisitCompleted == true;
        });
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
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

  Get_DiseaseWiseApptCount() {
    let dataobj = {}
    this._apiservice.Get_DiseaseWiseApptCount(dataobj).subscribe(data => {
      if (data) {
        this.diseaseWiseApptCount=data;
        if(this.diseaseWiseApptCount && this.diseaseWiseApptCount.length>0)
        {
          for(var i=0;i<this.diseaseWiseApptCount.length;i++)
          {
            this.pieChartLabels.push(this.diseaseWiseApptCount[i].diseaseName);
            if(i==1)
            {
              this.pieChartData.push(4);

            }
            else
            {
              this.pieChartData.push(this.diseaseWiseApptCount[i].apptCount);
            }
          }
        }
        console.log("  this.diseaseWiseApptCount  this.diseaseWiseApptCount",  this.diseaseWiseApptCount)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_MedicineWiseApptCount() {
    let dataobj = {}
    this._apiservice.Get_MedicineWiseApptCount(dataobj).subscribe(data => {
      if (data) {
        this.medicineWiseApptCount=data;
        if(this.medicineWiseApptCount && this.medicineWiseApptCount.length>0)
        {
          for(var i=0;i<this.medicineWiseApptCount.length;i++)
          {
            this.doughnutChartLabels.push(this.medicineWiseApptCount[i].medicineName);
            if(i==1)
            {
              this.doughnutChartData.push(4);

            }
            else
            {
              this.doughnutChartData.push(this.medicineWiseApptCount[i].apptCount);
            }
          }
        }
        console.log("  this.medicineWiseApptCount  this.medicineWiseApptCount",  this.medicineWiseApptCount)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_PharmacistWiseApptCount() {
    let dataobj = {}
    this._apiservice.Get_PharmacistWiseApptCount(dataobj).subscribe(data => {
      if (data) {
        this.pharmacistWiseApptCount=data;
        if(this.pharmacistWiseApptCount && this.pharmacistWiseApptCount.length>0)
        {
          for(var i=0;i<this.pharmacistWiseApptCount.length;i++)
          {
            this.pieChartPharmacistLabels.push(this.pharmacistWiseApptCount[i].pharmacistName);
            if(i==1)
            {
              this.pieChartPharmacistData.push(4);

            }
            else
            {
              this.pieChartPharmacistData.push(this.pharmacistWiseApptCount[i].apptCount);
            }
          }
        }
      
        console.log("  this.pharmacistWiseApptCount  this.pharmacistWiseApptCount",  this.pharmacistWiseApptCount)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}

