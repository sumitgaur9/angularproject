import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-createlabtest',
  templateUrl: './createlabtest.component.html',
  styleUrls: ['./createlabtest.component.css']
})
export class CreatelabtestComponent implements OnInit {
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

  public sampleTypeListData=[{"name":"blood"},{"name":"muscus"},{"name":"urine"}]

  public createlabtestform = new FormGroup({
    testName: new FormControl(""),
    sampleType: new FormControl(""),
    minSampleSize: new FormControl(""),
    price: new FormControl(""),
  });

  public passwordPatternError = false;
  public expertiesArrayData:any=[];
  

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  //this.Get_DoctorProfile();
  //this.Get_ExpertiseList();
  }


  get f() { return this.createlabtestform.controls; }


  Save_LabTest() {
    this.submitted = true;
    if (this.createlabtestform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.createlabtestform.value;
    this._apiservice.Save_LabTest(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks for submit Save_LabTest');
        this.CloseModal();
      //  this.router.navigate(['/doctorlist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }



  
  


}

