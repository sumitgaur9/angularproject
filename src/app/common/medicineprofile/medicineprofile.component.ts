import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant';



@Component({
  selector: 'app-medicineprofile',
  templateUrl: './medicineprofile.component.html',
  styleUrls: ['./medicineprofile.component.css']
})
export class MedicineprofileComponent implements OnInit {


  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() getmedicineprofileid: string = '';


  @Output() ClosePopup: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  public companyArrayData:any=[];
  public medicineListDataArray:any=[];

  /************************** */

  public uploadreportdatainput: any;
  public testimageform = new FormGroup({
    image: new FormControl("")
  });

  public uploadResult = "";
  public UploadFile = [];
  public UploadFileName = "";
  getImageValue;

  keyword = 'name';
  public medicineProfileForm = new FormGroup({
    medicineName: new FormControl(""),
    newimage: new FormControl(),
    image: new FormControl(""),
    companyName: new FormControl(""),
    price: new FormControl(""),
    id: new FormControl(""),
    description: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));

    if (this.getmedicineprofileid != undefined && this.getmedicineprofileid != null && this.getmedicineprofileid != '') {
      this.Get_Medicine();
    }
    this.Get_CompanyList();
    this.Get_MedicinesList();
  }

  get f() { return this.medicineProfileForm.controls; }


  Get_Medicine() {
    let dataobj = {
    };

    let medicineid = this.currentUser.roleBaseId;
    if (this.currentUser.user.role == 11) {
      medicineid = this.getmedicineprofileid;
    }
    this._apiservice.Get_Medicine(dataobj, medicineid).subscribe(data => {
      if (data) {
        console.log("data", data);
        if (data.medicineName != undefined) {
          this.medicineProfileForm.patchValue({
            medicineName: data.medicineName
          });
        }
        if (data.description != undefined) {
          this.medicineProfileForm.patchValue({
            description: data.description
          });
        }
        if (data.price != undefined) {
          this.medicineProfileForm.patchValue({
            price: data.price
          });
        }
        if (data.companyName != undefined) {
          this.medicineProfileForm.patchValue({
            companyName: data.companyName
          });
        }
        
        if (data.image != undefined) {
          this.medicineProfileForm.patchValue({
            image: data.image
          });
        }
        if (data.newimage != undefined && data.newimage.data != undefined) {
          this.getImageValue = this.arrayBufferToBase64(data.newimage.data.data);//need to update data in base 64

          this.medicineProfileForm.patchValue({
            newimage: data.newimage
          });
        }
        else {
          this.getImageValue = defaultImage.medicinelink;
        }


        if (data._id != undefined) {
          this.medicineProfileForm.patchValue({
            id: data._id
          });
        }


      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  callUpdataAPI() {

    if (this.getmedicineprofileid != undefined && this.getmedicineprofileid != null && this.getmedicineprofileid != '') {
      this.Update_Medicine();
    }
    else {
      this.Save_Medicine();
    }
  }


  Update_Medicine() {
    this.submitted = true;
    if (this.medicineProfileForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj = {};
    dataobj = this.medicineProfileForm.value;
    var formData = new FormData();
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('image', '');
    formData.append('medicineName', this.medicineProfileForm.value.medicineName);
    formData.append('email', this.medicineProfileForm.value.email);
    formData.append('companyName', this.medicineProfileForm.value.companyName);
    formData.append('price', this.medicineProfileForm.value.price);
    formData.append('description', this.medicineProfileForm.value.description);
    this._apiservice.Update_Medicine(formData, this.medicineProfileForm.value.id).subscribe(data => {
      if (data) {
        console.log("loginUserResponseData..", data.data);
        this.toastr.success('Thanks to being a part of our platform');
        this.CloseModal(true);
        // this.router.navigate(['/nurselist']);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
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

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);



  }



  Save_Medicine() {
    this.submitted = true;
    if (this.medicineProfileForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj = {};
    dataobj = this.medicineProfileForm.value;
    var formData = new FormData();
    if (this.UploadFile.length && this.UploadFileName) {
      formData.append('newimage', this.UploadFile[0], this.UploadFileName);
    } else {
      formData.append('newimage', '');
    }
    formData.append('image', '');
    formData.append('medicineName', this.medicineProfileForm.value.medicineName);
    formData.append('email', this.medicineProfileForm.value.email);
    formData.append('companyName', this.medicineProfileForm.value.companyName);
    formData.append('price', this.medicineProfileForm.value.price);
    formData.append('description', this.medicineProfileForm.value.description);
    this._apiservice.Save_Medicine(formData).subscribe(data => {
      if (data) {
        this.toastr.success('Saved Sucessfully');
        this.CloseModal(true);
      }
    }, error => {
      if (error.error.code === 11000) {
        this.errorMessage = error.error.errmsg; this.toastr.error(this.errorMessage);
      } else {
        this.errorMessage = error.error.message; this.toastr.error(this.errorMessage);
      }
    });
  }

  Get_CompanyList() {
    let dataobj = {
    };
    this._apiservice.Get_CompanyList(dataobj).subscribe(data => {
      if (data) {
        this.companyArrayData =data;
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  Get_MedicinesList(companyName?) {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj,companyName).subscribe(data => {
      if (data) {
        this.medicineListDataArray = [];
        for(var i=0;i<data.length;i++)
        {
          let dataobj:any={};
          dataobj.id=data[i]._id;
          dataobj.name=data[i].medicineName;
          this.medicineListDataArray.push(dataobj);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

  
  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent",item);
    this.toastr.warning("Medicine Already created from this name,please add another text", '', {
      timeOut: 8000,
    });
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("onChangeSearch",val);
    this.medicineProfileForm.patchValue({
      medicineName:val
    })
  }
  
  onFocused(e){
    // do something when input is focused
  }
 

}

