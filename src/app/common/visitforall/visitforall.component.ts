import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-visitforall',
  templateUrl: './visitforall.component.html',
  styleUrls: ['./visitforall.component.css']
})
export class VisitforallComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() appointmentid;
  @Input() patientname;
  @Input() bookLabTestId;

  

  

  

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public visitforallform = new FormGroup({
    patientName:new FormControl(""),
    isNextVisitRequired: new FormControl(""),
  });

  public passwordPatternError = false;

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
    
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.visitforallform.patchValue({
    patientName:this.patientname
  })
  }


  get f() { return this.visitforallform.controls; }


  Save_VisitCompleteIntimation() {
    this.submitted = true;
    if (this.visitforallform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj:any={};
    dataobj= this.visitforallform.value;
    dataobj.appointmentId=this.appointmentid;
    dataobj.bookLabTestId=this.bookLabTestId;
    dataobj.role=this.currentUser.user.role

    this._apiservice.Save_VisitCompleteIntimation(dataobj).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('thanks for submit visiting form');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
}

