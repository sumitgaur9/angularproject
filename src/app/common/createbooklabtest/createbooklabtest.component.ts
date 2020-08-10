import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-createbooklabtest',
  templateUrl: './createbooklabtest.component.html',
  styleUrls: ['./createbooklabtest.component.css']
})
export class CreatebooklabtestComponent implements OnInit {
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

  public labTestData=[];

  public patientListData:any=[];
  public testPackageListData:any=[];

  


  public sampleTypeListData=[{"name":"package"},{"name":"individual"}]

  public createBookLabTestform = new FormGroup({
    patientNname: new FormControl(""),
    patientMob: new FormControl(""),
    patientEmail: new FormControl("", [Validators.required, Validators.pattern(this.emailPattern)]),
    patientID: new FormControl(""),
    patientAddres: new FormControl(""),
    patientPIN: new FormControl(""),
    testType: new FormControl(""),
    packageID: new FormControl(""),
    packageName: new FormControl(""),
    testsDataUIName: new FormControl(""),
    testsDataUIID: new FormControl(""),
    price: new FormControl(""),
    //isReportGenerated: new FormControl(""),
  });

  public passwordPatternError = false;
  public expertiesArrayData:any=[];
  

  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }


  ngOnInit() {
  this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  this.Get_PatientsList();
  this.Get_LabTestsPackage();
  this.Get_LabTestsList();
  }


  get f() { return this.createBookLabTestform.controls; }


  Save_BookLabTest() {
    this.submitted = true;
    // if (this.createBookLabTestform.invalid) {
    //   return;
    // }
    this.errorMessage = "";
   

let newdatatemp={
    patientNname: this.createBookLabTestform.value.patientNname,
    patientMob:  this.createBookLabTestform.value.patientMob,
    patientEmail: this.createBookLabTestform.value.patientEmail,
    patientID: this.createBookLabTestform.value.patientID,
    patientAddres: this.createBookLabTestform.value.patientAddres,
    patientPIN:this.createBookLabTestform.value.patientPIN,
    testType: this.createBookLabTestform.value.testType,
    packageID: this.createBookLabTestform.value.packageID,
    packageName: this.createBookLabTestform.value.packageName,
    price: this.createBookLabTestform.value.price,
}

let dataobj=[{
     "testID": this.createBookLabTestform.value.testsDataUIID,
     "testname": this.createBookLabTestform.value.testsDataUIName,
}];
//testsDataUIName: this.createBookLabTestform.value.patientNname,
//testsDataUIID: this.createBookLabTestform.value.patientNname,
//dataobj= this.createBookLabTestform.value;
newdatatemp["testsData"]=dataobj;
    this._apiservice.Save_BookLabTest(newdatatemp).subscribe(data => {
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

  

  Get_LabTestsPackage() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsPackage(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_LabTestsPackage is ", data);
        this.testPackageListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_PatientsList() {
    let dataobj = {
    };
    this._apiservice.Get_PatientsList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_PatientsList is ", data);
        this.patientListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  patientNameChangeEvent($event) {
    let newArray = this.patientListData.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.createBookLabTestform.patchValue(
        {
          patientID:newArray[0]._id
        }
      )
    }
  }
  
  packageNameChangeEvent($event) {
    let newArray = this.testPackageListData.filter(function (item) {
      return item.packageNname == $event.target.value;
    });
    if (newArray) {
      this.createBookLabTestform.patchValue(
        {
          packageID:newArray[0]._id
        }
      )
    }
  }

  testChangeEvent($event) {
    let newArray = this.labTestData.filter(function (item) {
      return item.testName == $event.target.value;
    });
    if (newArray) {
      this.createBookLabTestform.patchValue(
        {
          testsDataUIID:newArray[0]._id
        }
      )
    }
  }

  


}


