import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
declare var $: any;

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
  textareaValue: string = '';

  public labTestData = [];
  public completelabTestData: any = [];
  public patientListData: any = [];
  public testPackageListData: any = [];
  public showpatientformpopup: boolean = false;
  public getpatientprofileid;
  public itemList = [];
  public selectedItems = [];
  public settings = {};
  public nurseListData: any = [];
  public currentUserMeRes;
  public currentUserLoginResponse;
  public passwordPatternError = false;
  public expertiesArrayData: any = [];
  public sampleTypeListData = [{ "name": "package" }, { "name": "individual" }]
  public visiblePatientNameSelect: boolean = false;

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
    skills: new FormControl([[], Validators.required]),
    nurseID: new FormControl(""),
    nurseName: new FormControl(""),
    //isReportGenerated: new FormControl(""),
  });

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }


  ngOnInit() {
    this.currentUserLoginResponse = JSON.parse(window.localStorage.getItem("userToken"));  //role not coming in userme api so need to take value from both storage because patient all info come in userme not in login response
    this.currentUserMeRes = JSON.parse(window.localStorage.getItem("currentusermedata"));
    this.Get_PatientsList();
    if (this.currentUserMeRes.user && this.currentUserMeRes.user._id && this.currentUserLoginResponse.user.role < 1) {
      this.updatePatientDetails(this.currentUserMeRes.user);   //for admin no need to updatepatientdetail
    }

    if (this.currentUserLoginResponse.user && this.currentUserLoginResponse.user.role == 11) {
      this.visiblePatientNameSelect = true;
    } else {
      this.visiblePatientNameSelect = false;
    }

    this.labTestData = [];
    this.selectedItems = [];
    this.settings = {
      text: "Select Test",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };
    this.Get_LabTestsPackageList();
    this.Get_LabTestsList();
    this.Get_NursesList();
  }

  get f() { return this.createBookLabTestform.controls; }

  calculatePrice(selecteddata) {
    let pricearray = [];
    for (var i = 0; i < selecteddata.length; i++) {
      let newArray = this.completelabTestData.filter(function (item) {
        return item._id == selecteddata[i].id;
      });
      pricearray.push(newArray[0].price)
    }
    let sum = 0;
    for (var i = 0; i < pricearray.length; i++) {
      sum = sum + pricearray[i]
    }
    this.createBookLabTestform.patchValue(
      {
        price: sum
      }
    )
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.calculatePrice(this.selectedItems);
    // let newArray = this.testPackageListData.filter(function (item) {
    //   return item.packageNname == $event.target.value;
    // });
    // if (newArray) {
    //   this.createBookLabTestform.patchValue(
    //     {
    //       packageID: newArray[0]._id,
    //       price: newArray[0].packageAmount,
    //     }
    //   )
    // }
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.calculatePrice(this.selectedItems);

  }
  onDeSelectAll(items: any) {
    console.log(items);
    this.createBookLabTestform.patchValue(
      {
        price: 0
      }
    )

  }
  Save_BookLabTest() {
    this.submitted = true;
    if (this.createBookLabTestform.invalid) {
      return;
    }
    this.errorMessage = "";
    this.errorMessage = "";
    let dataobj: any = {};
    dataobj.patientNname = this.createBookLabTestform.value.patientNname;
    dataobj.patientMob = this.createBookLabTestform.value.patientMob;
    dataobj.patientEmail = this.createBookLabTestform.value.patientEmail;
    dataobj.patientID = this.createBookLabTestform.value.patientID;
    dataobj.patientAddres = this.createBookLabTestform.value.patientAddres;
    dataobj.patientPIN = this.createBookLabTestform.value.patientPIN;
    dataobj.testType = this.createBookLabTestform.value.testType;
    dataobj.packageID = this.createBookLabTestform.value.packageID;
    dataobj.packageName = this.createBookLabTestform.value.packageName;
    dataobj.nurseID = this.createBookLabTestform.value.nurseID;
    dataobj.nurseName = this.createBookLabTestform.value.nurseName;
    dataobj.price = this.createBookLabTestform.value.price;
    dataobj["testsData"] = [{ "testID": '', "testname": '' }]; // in case of package  selection if testdata goes blank then api give error
    if (dataobj.packageID == null || dataobj.packageID == '' || dataobj.packageID == undefined) {
      for (var i = 0; i < this.createBookLabTestform.value.skills.length; i++) {
        let testdataobj = {
          "testID": this.createBookLabTestform.value.skills[i].id,
          "testname": this.createBookLabTestform.value.skills[i].itemName,
        }
        dataobj["testsData"].push(testdataobj);
      }
    }
    this._apiservice.Save_BookLabTest(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks for submit Save_LabTest');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_LabTestsList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsList(dataobj).subscribe(data => {
      if (data) {
        this.completelabTestData = data;
        for (var i = 0; i < data.length; i++) {
          let dataobj1 = {
            "id": data[i]._id,
            "itemName": data[i].testName
          }
          this.labTestData.push(dataobj1);
        }
        console.log("this.labTestData", this.labTestData);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_LabTestsPackageList() {
    let dataobj = {
    };
    this._apiservice.Get_LabTestsPackageList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_LabTestsPackageList is ", data);
        this.testPackageListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  nurseNameChangeEvent($event) {
    let newArray = this.nurseListData.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.createBookLabTestform.patchValue(
        {
          nurseID: newArray[0]._id
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
          packageID: newArray[0]._id,
          price: newArray[0].packageAmount,
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
          testsDataUIID: newArray[0]._id
        }
      )
    }
  }

  Get_NursesList() {
    let dataobj = {
    };
    this._apiservice.Get_NursesList(dataobj).subscribe(data => {
      if (data) {
        this.nurseListData = data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
  
  patientNameChangeEvent($event) {
    let newArray = this.patientListData.filter(function (item) {
      return item._id == $event.target.value;
    });
    if (newArray) {
      this.updatePatientDetails(newArray[0]);
    }
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

  public async closePatientProfilePopup() {
    this.showpatientformpopup = false;
    $('#showpatientformpopup').modal('hide');
  }

  public openPatientProfilePopup() {
    this.showpatientformpopup = true;
    setTimeout(() => {
      $(window).scrollTop(0);
      $('#showpatientformpopup').modal('show');
    }, 100);
  }

  userme() {
    let dataparam: any = {};
    this._apiservice.userme(dataparam).subscribe(data => {
      console.log("userme data is this", JSON.stringify(data));
      this.currentUserMeRes = JSON.parse(window.localStorage.getItem("currentusermedata"));
    }, error => {
      if (error && error.error && error.error.message) {
        this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      }
    });
  }

  updatePatientDetails(patientdetail) {
    this.createBookLabTestform.patchValue({
      patientNname: patientdetail.name,
      patientEmail: patientdetail.email,
      patientMob: patientdetail.phoneno,
      patientAddres: patientdetail.address,
      patientID: patientdetail._id,
    });

    this.textareaValue = 
  `  ----Patient Details----
  Name: ${patientdetail.name}
  Email: ${patientdetail.email}
  Phone: ${patientdetail.phoneno}
  Add: ${patientdetail.address}`;

    this.getpatientprofileid = this.createBookLabTestform.controls.patientID.value;   //for sending in patient profile popup
  }

  public async patientProfileResponseReturn(value) {
    console.log("patientProfileResponseReturnpatientProfileResponseReturn", value);
    if (this.currentUserMeRes.user && this.currentUserMeRes.user._id && this.currentUserLoginResponse.user.role < 1) {
      await this.userme();     //for admin no need to updatepatientdetail
    }
    this.Get_PatientsList();     //update list in return if new patient added and any updation in list
    this.updatePatientDetails(value);
  }

}


