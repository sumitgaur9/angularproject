import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-createlabtestpackage',
  templateUrl: './createlabtestpackage.component.html',
  styleUrls: ['./createlabtestpackage.component.css']
})
export class CreatelabtestpackageComponent implements OnInit {
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

  public labTestData=[{}]

  public sampleTypeListData=[{"name":"blood"},{"name":"muscus"},{"name":"urine"}]

  public createlabtestpackageform = new FormGroup({
    packageNname: new FormControl(""),
    packageAmount: new FormControl(""),
    testsData: new FormControl(""),
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


  get f() { return this.createlabtestpackageform.controls; }


  Save_LabTestsPackage() {
    this.submitted = true;
    if (this.createlabtestpackageform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.createlabtestpackageform.value;
    dataobj["testsData"]=[{"testID":"1","testname":"blood"}];
    this._apiservice.Save_LabTestsPackage(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks for submit Save_LabTest');
        this.CloseModal();
      //  this.router.navigate(['/doctorlist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }



  

  Get_LabTestsList() {
    let dataobj={
    };
    this._apiservice.Get_LabTestsList(dataobj,).subscribe(data => {
      if (data) {
        this.labTestData=data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  


}

