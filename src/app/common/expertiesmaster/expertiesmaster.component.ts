import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-expertiesmaster',
  templateUrl: './expertiesmaster.component.html',
  styleUrls: ['./expertiesmaster.component.css']
})
export class ExpertiesmasterComponent implements OnInit {

  
  @Input() showModal: boolean = false;
  @Input() userEmail = null;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal() {
    this.ClosePopup.emit();
  }

  public submitted = false;
  errorMessage = '';

  public expertiesMasterForm = new FormGroup({
    diseaseName: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;
  public expertiesDataArray=[{"name":"physician"},{"name":"cardiologist"}];

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.localStorage.getItem("userToken"));
  }

  get f() { return this.expertiesMasterForm.controls; }


 

  Save_Expertise() {
    this.submitted = true;
    if (this.expertiesMasterForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.expertiesMasterForm.value;
    this._apiservice.Save_Expertise(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks to being a part of our platform');
        this.CloseModal();
      }
    }, error => {
      this.errorMessage = error.error.message;
    });
  }
}



