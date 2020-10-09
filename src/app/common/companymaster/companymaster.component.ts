import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';


@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.css']
})
export class CompanymasterComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  public companyArrayData:any=[];

  public companyMasterForm = new FormGroup({
    companyName: new FormControl("", [Validators.required]),
  });

  public passwordPatternError = false;
  public currentUser;
  
  keyword = 'name';


  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_CompanyList();
  }

  get f() { return this.companyMasterForm.controls; }


  Get_CompanyList() {
    let dataobj = {
    };
    this._apiservice.Get_CompanyList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_CompanyListGet_CompanyList", data);
        this.companyArrayData = [];
        for(var i=0;i<data.length;i++)
        {
          let dataobj:any={};
          dataobj.id=data[i]._id;
          dataobj.name=data[i].companyName;
          this.companyArrayData.push(dataobj);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Save_Company() {
    this.submitted = true;
    if (this.companyMasterForm.invalid) {
      this.toastr.warning("Experties name is required");
      return;
    }
    this.errorMessage = "";
    let dataobj:any={};
    dataobj= this.companyMasterForm.value;
    this._apiservice.Save_Company(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('Saved Sucessfully');
        this.CloseModal(true);
      }
    }, error => {
      if(error.error.code ===11000){
        this.errorMessage = error.error.errmsg; this.toastr.error(this.errorMessage);        
      } else {
        this.errorMessage = error.error.message; this.toastr.error(this.errorMessage);
      }
    });
  }
 
 
  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent",item);
    this.toastr.warning("Experties Already created from this name,please add another text", '', {
      timeOut: 8000,
    });
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("onChangeSearch",val);
    this.companyMasterForm.patchValue({
      companyName:val
    })

  }
  
  onFocused(e){
    // do something when input is focused
  }
}




