import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-medicinemaster',
  templateUrl: './medicinemaster.component.html',
  styleUrls: ['./medicinemaster.component.css']
})
export class MedicinemasterComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }


  public medicineDataArray=[{"name":"cipla"},{"name":"crosin"}];
  public companyNameDataArray=[{"name":"Aimil"},{"name":"cipla"}];


  public submitted = false;
  errorMessage = '';

  public medicineMasterForm = new FormGroup({
    medicineName: new FormControl(""),
    companyName: new FormControl(""),
    price: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
  }

  get f() { return this.medicineMasterForm.controls; }


 

  Save_Medicine() {
    this.submitted = true;
    if (this.medicineMasterForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.medicineMasterForm.value;
    this._apiservice.Save_Medicine(dataobj).subscribe(data => {
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
}



