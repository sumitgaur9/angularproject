import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {


  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public bookAppointmentForm = new FormGroup({
    patientNname: new FormControl(""),
    patientEmail: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    patientMob: new FormControl(""),
    patientAddres: new FormControl(""),
    patientPIN: new FormControl(""),
    disease: new FormControl(""),
    diseaseAge: new FormControl(""),
    doctorID: new FormControl(""),
    doctorName: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;
  public diseasListData: any = [];
  public filterDoctorData: any = [];
  public selecteddoctorid;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.Get_DiseasesList();
    // this.Get_FilteredDoctors();
  }

  get f() { return this.bookAppointmentForm.controls; }




  Save_BookAppointment() {
    this.submitted = true;
    if (this.bookAppointmentForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj = {};
    dataobj = this.bookAppointmentForm.value;
    //dataobj["doctorID"] = "5f268ed2b7335a0004fcd325";
    //dataobj["doctorName"] = "doctor1";
    this._apiservice.Save_BookAppointment(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  Get_DiseasesList() {
    let dataobj = {
    };
    this._apiservice.Get_DiseasesList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_DiseasesList is ", data);
        this.diseasListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

  diseaseschangeevent($event) {
    let newArray = this.diseasListData.filter(function (item) {
      return item.diseaseName == $event.target.value;
    });

    if (newArray) {
      this.Get_FilteredDoctors(newArray[0].takeCareBy);
    }
  }

  doctorChangeEvent($event) {
    let newArray = this.filterDoctorData.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.bookAppointmentForm.controls.doctorID.setValue(newArray[0]._id);
    }
  }



  Get_FilteredDoctors(experties) {
    let dataobj = {};
    this._apiservice.Get_FilteredDoctors(dataobj, experties).subscribe(data => {
      if (data) {
        console.log("filterDoctorData ", data);
        this.filterDoctorData = data;
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }



}

