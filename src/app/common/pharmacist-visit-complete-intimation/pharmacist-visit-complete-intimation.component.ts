
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pharmacist-visit-complete-intimation',
  templateUrl: './pharmacist-visit-complete-intimation.component.html',
  styleUrls: ['./pharmacist-visit-complete-intimation.component.css']
})
export class PharmacistVisitCompleteIntimationComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() appointmentid:string='';


  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public medicineListDataArray:any=[]; 
  public doctorListDataArray:any=[];
  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public pharmaVisitCompleteIntimationForm = new FormGroup({
    patientName: new FormControl(""),
    medicineName: new FormControl(""),
    doctorName: new FormControl(""),
    pharmacyPersonContactNo: new FormControl(""),
    doctorID: new FormControl(""),
    medicineID: new FormControl(""),
  });

  public passwordPatternError = false;

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_MedicinesList();
  this.Get_DoctorsList();
  }


  get f() { return this.pharmaVisitCompleteIntimationForm.controls; }

  

  medicineChangeEvent($event) {
    let newArray = this.medicineListDataArray.filter(function (item) {
      return item.medicineName == $event.target.value;
    });
    if (newArray) {
      this.pharmaVisitCompleteIntimationForm.patchValue(
        {
          medicineID:newArray[0]._id
        }
      )
    }
  }

  doctorChangeEvent($event) {
    let newArray = this.doctorListDataArray.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.pharmaVisitCompleteIntimationForm.patchValue(
        {
          doctorID:newArray[0]._id
        }
      )
    }
  }

  Get_MedicinesList() {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj).subscribe(data => {
      if (data) {
        this.medicineListDataArray = data;
        console.log("medicineListDataArray ", data);

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Get_DoctorsList() {
    let dataobj = {
    };
    this._apiservice.Get_DoctorsList(dataobj).subscribe(data => {
      if (data) {
        this.doctorListDataArray = data;
        console.log("doctorListDataArray ", data);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Save_PharmaVisitCompleteIntimation() {
    this.submitted = true;
    if (this.pharmaVisitCompleteIntimationForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.pharmaVisitCompleteIntimationForm.value;
    dataobj["appointmentId"]=this.appointmentid;
    this._apiservice.Save_PharmaVisitCompleteIntimation(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for pharmaVisitCompleteIntimationForm');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}

