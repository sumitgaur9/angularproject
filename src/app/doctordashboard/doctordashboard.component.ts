import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnum } from 'src/app/shared/app.enum';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, MultiDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
declare var $: any;

@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {

  public doctorAppointmentHistoryListData: any = [];
  public doctorUpComingAppointmentData: any = [];
  public showRequestPatMedHomeDelivery: boolean = false;
  public apptHistoryData:any=[];
  public reqByDoctorId: string = '';
  public reqByPatientId: string = '';
  public reqByDoctorName: string = '';
  public commonDashBoardCountData: any = {
    total_no_of_doctors: 0,
    total_no_of_nurses: 0,
    total_no_of_patients: 0,
    total_no_of_pharmacists: 0,
  };
  public diseaseWiseApptCount: any;
  public medicineWiseApptCount: any;
  public pharmacistWiseApptCount: any;
  public doctorWiseApptCount: any;
  public monthlyHomeOnlineApptCount: any;
  public completeDoctorVisitData: any = [];
  public errorMessage;
  public showVisitForAll: boolean = false;
  public visitAppointmentId: string = '';
  public patientname: string = '';
  public inputrequesPatMedHomeDelivery: any = {
    patientNname: '',
    patientMob: '',
    patientPIN: '',
    patientAddres: '',
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartColor: any = [
    {
      backgroundColor: ['#157fda',
        '#39b49b',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        '#157fda',
        '#39b49b',
        'rgba(139, 136, 136, 0.9)',
        'rgba(255, 161, 181, 0.9)',
        'rgba(255, 102, 0, 0.9)',
        '#157fda',
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
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'HomeVisitCount',
    },
    { data: [], label: 'OnlineConsultationCount' }
  ];
  public barChartColors: Color[] = [
    { backgroundColor: '#157fda' },
    { backgroundColor: '#39b49b' },
  ]
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public currentUser;
  public usersParams: any = {};
  public patientMedicinesHomeDelivery:any=[];

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.Get_CommonDashboardCount();
    this.Get_DiseaseWiseApptCount();
    this.Get_PharmacistWiseApptCount();
    this.Get_MonthlyHomeOnlineApptCount();
    this.Get_PatientMedicinesHomeDelivery();
   // let todaydate=this.utilityservice.ToDBDateFormat(new Date()).replace(/-/g, '/');
   // console.log("todaydatetodaydate",todaydate);
  }
  public closeshowVisitForAll(calllistapi) {
    this.showVisitForAll = false;
    $('#showVisitForAllModal').modal('hide');
    if(calllistapi)
    {
      this.Get_AppointmentsByDocID();
    }
  }
  public openShowVisitForAll(data) {
    this.showVisitForAll = true;
    console.log("data is this", data);
    this.visitAppointmentId = data._id;
    this.patientname = data.patientNname;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showVisitForAllModal').modal('show');
    }, 100);
  }

  public closeRequestPatMedHomeDelivery(calllistapi) {
    this.showRequestPatMedHomeDelivery = false;
    $('#showRequestPatMedHomeDeliveryModal').modal('hide');
    if(calllistapi)
    {
      this.Get_AppointmentsByDocID();
    }
  }

  getTimeSlot(id){
    switch (id) {
      case 0:
        return '10 AM - 11 AM';
        break;
      case 1:
        return '11 AM - 12 AM';
        break;
      case 2:
        return '12 PM - 01 PM';
        break;
      case 3:
        return '01 PM - 02 PM';
        break;
      case 4:
        return '02 PM - 03 PM';
        break;
      case 5:
        return '03 PM - 04 PM';
        break;
      case 6:
        return '04 PM - 05 PM';
        break;
      case 7:
        return '05 PM - 06 PM';
        break;
    }
  }

  public openRequestPatMedHomeDelivery(data) {
    // if(!data.isVisitCompleted){
    //   this.toastr.warning('Complete its Visit first');
    //   return;
    // }
    this.showRequestPatMedHomeDelivery = true;
    this.visitAppointmentId = data._id;
    this.reqByDoctorId = data.doctorID;
    this.reqByPatientId = data.patientID;
    this.reqByDoctorName = data.doctorName;
    console.log("data is this", data);
    this.inputrequesPatMedHomeDelivery.patientNname = data.patientNname;
    this.inputrequesPatMedHomeDelivery.patientMob = data.patientMob;
    this.inputrequesPatMedHomeDelivery.patientPIN = data.patientPIN;
    this.inputrequesPatMedHomeDelivery.patientAddres = data.patientAddres;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showRequestPatMedHomeDeliveryModal').modal('show');
    }, 100);
  }

  Get_PatientMedicinesHomeDelivery() {
    let dataobj = {}
    this._apiservice.Get_PatientMedicinesHomeDelivery(dataobj).subscribe(data => {
      if (data) {
        this.patientMedicinesHomeDelivery=data;
        this.Get_AppointmentsByDocID();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Get_AppointmentsByDocID() {
    let dataobj = {
      doctorID: this.currentUser.user.role != 11 ? this.currentUser.roleBaseId : null,
      sortBy: this.usersParams.sortBy,
      sortDir: this.usersParams.sortDir
    }
    if (dataobj.doctorID == null) {
      delete dataobj.doctorID;
    }
    this._apiservice.Get_AppointmentsByDocID(dataobj).subscribe(data => {
      if (data) {
        this.doctorAppointmentHistoryListData = [];
        this.doctorUpComingAppointmentData = [];

        this.completeDoctorVisitData = data;
        this.completeDoctorVisitData.forEach(element => {
          element.individualsymptom = '';
          element.appointmentDate = this.utilityservice.ToDisplayDateFormat(new Date(element.appointmentDate));
             // let todaydate=this.utilityservice.ToDBDateFormat(new Date()).replace(/-/g, '/');
          element.symptomsData.forEach(element1 => {
            element.individualsymptom = element.individualsymptom + ' ' + element1.symptomName+ ','
          });
          element.individualillness = '';
          element.illnessHistoryData.forEach(element2 => {
            element.individualillness = element.individualillness + ' ' + element2.illnessName+ ','
          });
          //this.patientMedicinesHomeDelivery
         // if(this.currentUser.user.roleBaseId==element.doctorID)
         element["patientMedicinesHomeDelivery"]=[];
         // element["patientMedicinesHomeDelivery"]
          let patientMedicinesHomeDeliveryInfo = this.patientMedicinesHomeDelivery.filter(function (item) {
            var self = this;
            return (item.doctorID==element.doctorID && item.patientID==element.patientID)
          });

          for (var i = 0; i < patientMedicinesHomeDeliveryInfo.length; i++) {
            for (var j = 0; j < patientMedicinesHomeDeliveryInfo[i].medicinesData.length; j++) {
              let temp: any = {};
              let tempMedicineName: any = [];
           //   temp.medicineSNo = data[i].medicinesData[j].medicineSNo;
              temp.medicineScheduleDate = patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicineScheduleDate;
              temp.processInfo = patientMedicinesHomeDeliveryInfo[i].medicinesData[j].processInfo;//'After Lunch';
  
          //    let month = (new Date().getMonth() + 1).toString();
          //    let year = (new Date().getFullYear()).toString();
  
              // let yesterdayDateFromNewDate;
              // let yest_date = (new Date().getDate() < 9 ? '0' + (new Date().getDate() + 1) : new Date().getDate() + 1).toString();
              // yesterdayDateFromNewDate = (yest_date + '/' + month + '/' + year);
  
              // let todayDateFromNewDate;
              // let today_date = (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()).toString();
              // todayDateFromNewDate = (today_date + '/' + month + '/' + year);
  
              // let tommorowDateFromNewDate;
              // let tomm_date = (new Date().getDate() < 11 ? '0' + (new Date().getDate() - 1) : new Date().getDate() - 1).toString();
              // tommorowDateFromNewDate = (tomm_date + '/' + month + '/' + year);
  
              // if (yesterdayDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
              //   temp.yesterday_today_tommorrow = 'yesterday';
              //   temp.circleBackgroundColor = '#3fb49a';
              // } else if (todayDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
              //   temp.yesterday_today_tommorrow = 'today';
              //   temp.circleBackgroundColor = '#147fda';
              // } else if (tommorowDateFromNewDate == data[i].medicinesData[j].medicineScheduleDate) {
              //   temp.yesterday_today_tommorrow = 'tommorow';
              //   temp.circleBackgroundColor = '#f6a52d';
              // } else {
              //   if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() < new Date().getTime()) {
              //     temp.circleBackgroundColor = '#3fb49a';
              //   }
              //   else if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() == new Date().getTime()) {
              //     temp.circleBackgroundColor = '#147fda';
              //   }
              //   else if (new Date(data[i].medicinesData[j].medicineScheduleDate).getTime() > new Date().getTime()) {
              //     temp.circleBackgroundColor = '#f6a52d';
              //   }
              //   temp.yesterday_today_tommorrow = data[i].medicinesData[j].medicineScheduleDate;
              // }
  
              // temp.medicineScheduleTime = data[i].medicinesData[j].medicineScheduleTime;
              // if (parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) < 12) {
              //   temp.am_pm = 'am';
              // } else {
              //   temp.am_pm = 'pm';
              //   if (parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) == 12) {
              //     temp.medicineScheduleTime = data[i].medicinesData[j].medicineScheduleTime;
              //   } else {
              //     let hours = parseInt(data[i].medicinesData[j].medicineScheduleTime.substring(0, 2)) - 12;
              //     temp.medicineScheduleTime = hours + data[i].medicinesData[j].medicineScheduleTime.substring(2, 5);
              //   }
  
              // }
              for (var k = 0; k < patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
                tempMedicineName.push(patientMedicinesHomeDeliveryInfo[i].medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName)
              }
              temp.medicineName = tempMedicineName.toString();
           //   this.pharmaReqForHomeDelData.push(temp);
            //  this.pharmaReqForHomeDelData.reverse();
            element["patientMedicinesHomeDelivery"].push(temp);
            }
            let tempabc = {
              medicineScheduleDate:'',
              processInfo:'',
              medicineName: ''
            }
            element["patientMedicinesHomeDelivery"].push(tempabc);
          }

          //element["medicineHistory"]=


          if(element.appointmentDate<this.utilityservice.ToDisplayDateFormat(new Date()))
          {
            this.doctorAppointmentHistoryListData.push(element);
          }
          else{
            this.doctorUpComingAppointmentData.push(element);
          }
        });
      
        console.log("Get_AppointmentsByDocIDGet_AppointmentsByDocID", this.completeDoctorVisitData)
        console.log("doctorAppointmentHistoryListDatadoctorAppointmentHistoryListData", this.doctorAppointmentHistoryListData)
        console.log("doctorUpComingAppointmentDatadoctorUpComingAppointmentData", this.doctorUpComingAppointmentData)

        // for()
        // this.doctorAppointmentHistoryListData = this.completeDoctorVisitData.filter(function (item) {
        //   var self=this;
        //   return item.appointmentDate<self.utilityservice.ToDisplayDateFormat(new Date())
        // });
        // console.log("doctorAppointmentHistoryListDatadoctorAppointmentHistoryListData", this.doctorAppointmentHistoryListData)
        // this.doctorUpComingAppointmentData = this.completeDoctorVisitData.filter(function (item) {
        //   var selfself=this;
        //   return item.appointmentDate>=selfself.utilityservice.ToDisplayDateFormat(new Date())
        // });
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_CommonDashboardCount() {
    let dataobj = {}
    this._apiservice.Get_CommonDashboardCount(dataobj).subscribe(data => {
      if (data) {
        this.commonDashBoardCountData = data;
        console.log("  this.commonDashBoardCountData  this.commonDashBoardCountData", this.commonDashBoardCountData)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  

  Get_DiseaseWiseApptCount() {
    let dataobj = {};
    let doctorID = '';
    if (this.currentUser.user.role != 11) {
      doctorID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_DiseaseWiseApptCount(dataobj, doctorID).subscribe(data => {
      if (data) {
        this.diseaseWiseApptCount = data;
        if (this.diseaseWiseApptCount && this.diseaseWiseApptCount.length > 0) {
          for (var i = 0; i < this.diseaseWiseApptCount.length; i++) {
            if (this.currentUser.user.role == 11) {
              this.pieChartLabels.push(this.diseaseWiseApptCount[i].diseaseName);
              this.pieChartData.push(this.diseaseWiseApptCount[i].apptCount);
            }
            else if (this.diseaseWiseApptCount[i].apptCount > 0) {
              this.pieChartLabels.push(this.diseaseWiseApptCount[i].diseaseName);
              this.pieChartData.push(this.diseaseWiseApptCount[i].apptCount);
            }
          }
        }
        console.log("  this.diseaseWiseApptCount  this.diseaseWiseApptCount", this.diseaseWiseApptCount)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_PharmacistWiseApptCount() {
    let dataobj = {};
    let doctorID = '';
    if (this.currentUser.user.role != 11) {
      doctorID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_PharmacistWiseApptCount(dataobj, doctorID).subscribe(data => {
      if (data) {
        this.pharmacistWiseApptCount = data;
        if (this.pharmacistWiseApptCount && this.pharmacistWiseApptCount.length > 0) {
          for (var i = 0; i < this.pharmacistWiseApptCount.length; i++) {
            if (this.currentUser.user.role == 11) {
              this.pieChartPharmacistLabels.push(this.pharmacistWiseApptCount[i].pharmacistName);
              this.pieChartPharmacistData.push(this.pharmacistWiseApptCount[i].apptCount);
            }
            else if (this.pharmacistWiseApptCount[i].apptCount > 0) {
              this.pieChartPharmacistLabels.push(this.pharmacistWiseApptCount[i].pharmacistName);
              this.pieChartPharmacistData.push(this.pharmacistWiseApptCount[i].apptCount);
            }
          }
        }
        console.log("  this.pharmacistWiseApptCount  this.pharmacistWiseApptCount", this.pharmacistWiseApptCount)

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_MonthlyHomeOnlineApptCount() {
    let dataobj = {};
    let doctorID = '';
    if (this.currentUser.user.role != 11) {
      doctorID = this.currentUser.roleBaseId;
    }
    this._apiservice.Get_MonthlyHomeOnlineApptCount(dataobj, doctorID).subscribe(data => {
      if (data) {
        this.monthlyHomeOnlineApptCount = data;
        var lablehomevisitdataandseriesname: any = {
          data: [],
          label: 'HomeVisitCount',
        }
        var lableOnlineConsultationCountdataandseriesname: any = {
          data: [],
          label: 'OnlineConsultationCount',
        }

        if (this.monthlyHomeOnlineApptCount && this.monthlyHomeOnlineApptCount.length > 0) {
          for (var i = 0; i < this.monthlyHomeOnlineApptCount.length; i++) {
            this.barChartLabels.push(this.monthlyHomeOnlineApptCount[i].Month);
            this.barChartData[0].data.push(this.monthlyHomeOnlineApptCount[i].HomeVisitCount);
            this.barChartData[1].data.push(this.monthlyHomeOnlineApptCount[i].OnlineConsultationCount);
          }
        }
        console.log("  this.monthlyHomeOnlineApptCount  this.monthlyHomeOnlineApptCount", this.barChartData)
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  sortUserList(sortBy) {
    if (this.usersParams.sortBy == undefined && this.usersParams.sortDir == undefined) {
      this.usersParams.sortBy = sortBy;
      this.usersParams.sortDir = "desc";
    } else if (this.usersParams.sortBy == sortBy && this.usersParams.sortDir == "desc") {
      this.usersParams.sortBy = sortBy;
      this.usersParams.sortDir = "asc";
    } else if (this.usersParams.sortBy == sortBy && this.usersParams.sortDir == "asc") {
      this.usersParams.sortBy = sortBy;
      this.usersParams.sortDir = "desc";
    } else if (this.usersParams.sortBy != undefined && this.usersParams.sortBy != sortBy) {
      this.usersParams.sortBy = sortBy;
      this.usersParams.sortDir = "desc";
    }
    this.Get_AppointmentsByDocID();
  }

}

