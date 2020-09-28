import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-uploadtestreport',
  templateUrl: './uploadtestreport.component.html',
  styleUrls: ['./uploadtestreport.component.css']
})
export class UploadtestreportComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() uploadreportdatainput:any;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }
  public currentUser;

  errorMessage = '';
/****************for image********************* */
public testimageform = new FormGroup({
  image: new FormControl("")
});

public uploadResult = "";
public UploadFile = [];
public UploadFileName = "";

/********************** */

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  }
 
  uploadFile(fileInput) {
    if (fileInput.length === 0) { 
      return;
     }
    this.uploadResult = "";
    this.UploadFile = <Array<File>>fileInput.target.files;
    this.UploadFileName = this.UploadFile[0].name;
  }

  Save_UploadLabTestReport () {
    this.errorMessage = "";
    var formData = new FormData();
    formData.append('reportData', this.UploadFile[0], this.UploadFileName);

    formData.append('bookLabTestId', this.uploadreportdatainput.bookLabTestId);
    formData.append('labTechnicanID', this.uploadreportdatainput.labTechnicanID);
    formData.append('labTechnicanName', this.uploadreportdatainput.labTechnicanName);
    formData.append('reportGenerationDate', new Date().toString());


    this._apiservice.Save_UploadLabTestReport (formData).subscribe(data => {
      if (data) {
        this.toastr.success('Report Uploaded sucessfully');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}




