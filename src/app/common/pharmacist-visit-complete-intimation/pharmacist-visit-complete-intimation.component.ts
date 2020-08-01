
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

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public pharmaVisitCompleteIntimationForm = new FormGroup({
    patientName: new FormControl(""),
    medicineName: new FormControl(""),
    doctorName: new FormControl(""),
    pharmacyPersonContactNo: new FormControl(""),
  });

  public passwordPatternError = false;

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  }


  get f() { return this.pharmaVisitCompleteIntimationForm.controls; }

  

  Save_PharmaVisitCompleteIntimation() {
    this.submitted = true;
    if (this.pharmaVisitCompleteIntimationForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.pharmaVisitCompleteIntimationForm.value;
    this._apiservice.Save_PharmaVisitCompleteIntimation(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for pharmaVisitCompleteIntimationForm');
        this.CloseModal();
     //   this.router.navigate(['/doctorlist']);
      //   if (data.token && data.token != "" && data.token != null) {
      //     let datainput: any = {};
      //    // this.router.navigate(['/home']);
      // //    this.utilityservice.onLoginSuccessfully.next();
      //   }
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}

