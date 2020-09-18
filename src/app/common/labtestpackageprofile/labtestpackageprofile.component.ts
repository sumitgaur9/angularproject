import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-labtestpackageprofile',
  templateUrl: './labtestpackageprofile.component.html',
  styleUrls: ['./labtestpackageprofile.component.css']
})
export class LabtestpackageprofileComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getlabtestpackageid: string = '';
  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();

  public formMode: string = '';

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public expertiesArrayData: any = [];
  public currentUser;
  public labTestData = []
  public passwordPatternError = false;
  itemList = [];
  selectedItems = [];
  settings = {};
  public createlabtestpackageform = new FormGroup({
    packageNname: new FormControl(""),
    packageAmount: new FormControl(""),
    id: new FormControl(""),
    skills: new FormControl([[], Validators.required])
  });
  /************************** */
  public uploadreportdatainput: any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });

  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
    if (this.getlabtestpackageid != undefined && this.getlabtestpackageid != null) {
      this.formMode = "edit";
      this.Get_LabTestsPackage();
    }
    else {
      this.formMode = "new";
    }

    this.labTestData = [];
    this.selectedItems = [];
    this.settings = {
      text: "Select Test",
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


  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  Get_LabTestsPackage() {
    let dataobj = {
    };
    let labtestpackageid = this.getlabtestpackageid;
    this._apiservice.Get_LabTestsPackage(dataobj, labtestpackageid).subscribe(data => {
      if (data) {
        if (data.packageNname != undefined) {
          this.createlabtestpackageform.patchValue({
            packageNname: data.packageNname
          });
        }
        if (data.packageAmount != undefined) {
          this.createlabtestpackageform.patchValue({
            packageAmount: data.packageAmount
          });
        }
        // if (data.description != undefined) {
        //   this.createlabtestpackageform.patchValue({
        //     description: data.description
        //   });
        // }
        if (data.newimage != undefined && data.newimage.data != undefined) {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64

          this.createlabtestpackageform.patchValue({
            newimage: data.newimage
          });
        }
        if (data.skills != undefined) {
          this.createlabtestpackageform.patchValue({
            skills: data.testsData
          });
        }
        if (data._id != undefined) {
          this.createlabtestpackageform.patchValue({
            id: data._id
          });
        }
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
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
  callSubmitApi() {
    if (this.formMode == "edit") {
      this.Update_LabTestsPackage();
    }
    else {
      this.Save_LabTestsPackage();
    }
  }

  Save_LabTestsPackage() {
    this.submitted = true;
    if (this.createlabtestpackageform.invalid) {
      return;
    }
    let labtestdata: any = []
    this.errorMessage = "";
    var formData = new FormData();
    let testData = [];
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('packageNname', this.createlabtestpackageform.value.packageNname);
    formData.append('packageAmount', this.createlabtestpackageform.value.packageAmount);
    for (var i = 0; i < this.createlabtestpackageform.value.skills.length; i++) {
      let testdataobj = {
        "testID": this.createlabtestpackageform.value.skills[i].id,
        "testname": this.createlabtestpackageform.value.skills[i].itemName,
      }
      labtestdata.push(testdataobj);
    }
    formData.append('testsData', JSON.stringify(labtestdata));

    this._apiservice.Save_LabTestsPackage(formData).subscribe(data => {
      if (data) {
        this.toastr.success('Thanks for update lab test record');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
    });
  }

  Update_LabTestsPackage() {
    this.submitted = true;
    if (this.createlabtestpackageform.invalid) {
      return;
    }
    let labtestdata: any = []
    this.errorMessage = "";
    var formData = new FormData();
    let testData = [];
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('packageNname', this.createlabtestpackageform.value.packageNname);
    formData.append('packageAmount', this.createlabtestpackageform.value.packageAmount);
    for (var i = 0; i < this.createlabtestpackageform.value.skills.length; i++) {
      let testdataobj = {
        "testID": this.createlabtestpackageform.value.skills[i].id,
        "testname": this.createlabtestpackageform.value.skills[i].itemName,
      }
      labtestdata.push(testdataobj);
    }
    formData.append('testsData', JSON.stringify(labtestdata));
    this._apiservice.Update_LabTestsPackage(formData, this.createlabtestpackageform.value.id).subscribe(data => {
      if (data) {
        this.toastr.success('Thanks for update lab test record');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
    });
  }



  uploadFile(fileInput) {
    if (fileInput.length === 0) {
      return;
    }
    this.uploadResult = "";
    this.UploadFile = <Array<File>>fileInput.target.files;
    this.UploadFileName = this.UploadFile[0].name;

    this.main();

  }

  async main() {
    const files = document.querySelector('#myfile') as HTMLInputElement;
    const file = files.files[0];
    const result = await this.utilityservice.toBase64(file).catch(e => Error(e));
    if (result instanceof Error) {
      console.log('Error: ', result.message);
      return;
    }
    this.getImageValue = result;
  }

}

