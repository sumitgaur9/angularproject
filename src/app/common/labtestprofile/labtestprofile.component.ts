import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-labtestprofile',
  templateUrl: './labtestprofile.component.html',
  styleUrls: ['./labtestprofile.component.css']
})
export class LabtestprofileComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getbookedlabtestid: string = '';
  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();

  public formMode:string='';

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }
  
  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  public expertiesArrayData:any=[];
  

  public currentUser;



  public sampleTypeListData=[{"name":"blood"},{"name":"muscus"},{"name":"urine"}]

  public createlabtestform = new FormGroup({
    testName: new FormControl(""),
    sampleType: new FormControl(""),
    minSampleSize: new FormControl(""),
    price: new FormControl(""),
    newimage: new FormControl(),
    description: new FormControl(""),
    id: new FormControl(""),
  });



  public passwordPatternError = false;



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
    if(this.getbookedlabtestid!=undefined && this.getbookedlabtestid!=null)
    {
      this.formMode="edit";
      this.Get_LabTest();
    }
    else{
      this.formMode="new";
    }
  }

  get f() { return this.createlabtestform.controls; }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }

  Get_LabTest() {
    let dataobj = {
    };
    let doctorid = this.getbookedlabtestid;
    this._apiservice.Get_LabTest(dataobj, doctorid).subscribe(data => {
      if (data) {
        if (data.testName != undefined) {
          this.createlabtestform.patchValue({
            testName: data.testName
          });
        }
        if (data.sampleType != undefined) {
          this.createlabtestform.patchValue({
            sampleType: data.sampleType
          });
        }
        if (data.description != undefined) {
          this.createlabtestform.patchValue({
            description: data.description
          });
        }
      
        if (data.newimage != undefined && data.newimage.data != undefined) {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64

          this.createlabtestform.patchValue({
            newimage: data.newimage
          });
        }
        if (data.minSampleSize != undefined) {
          this.createlabtestform.patchValue({
            minSampleSize: data.minSampleSize
          });
        }
        if (data.price != undefined) {
          this.createlabtestform.patchValue({
            price: data.price
          });
        }
        
        if (data._id != undefined) {
          this.createlabtestform.patchValue({
            id: data._id
          });
        }


      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  callSubmitApi()
  {
    if(this.formMode=="edit")
    {
      this.Update_LabTest();
    }
    else{
      this.Save_LabTest();
    }

  }

  Save_LabTest() {
    this.submitted = true;
    if (this.createlabtestform.invalid) {
      return;
    }
    this.errorMessage = "";
    var formData = new FormData();
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('testName', this.createlabtestform.value.testName);
    formData.append('sampleType', this.createlabtestform.value.sampleType);
    formData.append('minSampleSize', this.createlabtestform.value.minSampleSize);
    formData.append('price', this.createlabtestform.value.price);
    formData.append('description', this.createlabtestform.value.description);
    this._apiservice.Save_LabTest(formData).subscribe(data => {
      if (data) {
        this.toastr.success('Thanks for update lab test record');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
      this.toastr.error(error.error.message);
    });
  }


  Update_LabTest() {
    this.submitted = true;
    if (this.createlabtestform.invalid) {
      return;
    }
    this.errorMessage = "";
    var formData = new FormData();
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('testName', this.createlabtestform.value.testName);
    formData.append('sampleType', this.createlabtestform.value.sampleType);
    formData.append('minSampleSize', this.createlabtestform.value.minSampleSize);
    formData.append('price', this.createlabtestform.value.price);
    formData.append('description', this.createlabtestform.value.description);
    this._apiservice.Update_LabTest(formData, this.createlabtestform.value.id).subscribe(data => {
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
