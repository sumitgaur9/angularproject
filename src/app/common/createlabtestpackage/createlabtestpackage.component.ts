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

  public labTestData = []
  // public sampleTypeListData = [{ "name": "blood" }, { "name": "muscus" }, { "name": "urine" }]
  public createlabtestpackageform = new FormGroup({
    packageNname: new FormControl(""),
    packageAmount: new FormControl(""),
    skills: new FormControl([[], Validators.required])
  });
  public passwordPatternError = false;
  public expertiesArrayData: any = [];
  public currentUser;
  itemList = [];
  selectedItems = [];
  settings = {};

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    this.labTestData = [];
    this.selectedItems = [];
    this.settings = {
      text: "Select Skills",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };
    this.Get_LabTestsList();
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  get f() { return this.createlabtestpackageform.controls; }

  Save_LabTestsPackage() {
    this.submitted = true;
    if (this.createlabtestpackageform.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj:any = {};
    dataobj.packageNname=this.createlabtestpackageform.value.packageNname;
    dataobj.packageAmount=this.createlabtestpackageform.value.packageAmount;
    dataobj["testsData"] = [];
    for (var i = 0; i < this.createlabtestpackageform.value.skills.length; i++) {
      let testdataobj = {
        "testID": this.createlabtestpackageform.value.skills[i].id,
        "testname": this.createlabtestpackageform.value.skills[i].itemName,
      }
      dataobj["testsData"].push(testdataobj);
    }
    //dataobj["testsData"] = [{ "testID": "1", "testname": "blood" }];
    this._apiservice.Save_LabTestsPackage(dataobj).subscribe(data => {
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
        for (var i = 0; i < data.length; i++) {
          let dataobj1 = {
            "id": data[i]._id,
            "itemName": data[i].testName
          }
          this.labTestData.push(dataobj1);
        }
        //         minSampleSize: 1
        // price: 1
        // sampleType: "blood"
        // testName: "1"
        // _id: "5f2e7f62ef3d170004de8723"
        console.log("this.labTestData", this.labTestData);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}

