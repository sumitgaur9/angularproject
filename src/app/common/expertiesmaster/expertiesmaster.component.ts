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

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public submitted = false;
  errorMessage = '';
  public expertiesArrayData:any=[];

  public expertiesMasterForm = new FormGroup({
    expertiseName: new FormControl("", [Validators.required]),
  });

  public passwordPatternError = false;
  public currentUser;
  public expertiesDataArray=[
    {"name":"physician"},
    {"name":"cardiologist"},
    {"name":"Neurology"},
    {"name":"Gynaecology"},
    {"name":"Dermatology"},
    {"name":"Plastic & Cosmetic Surgery"},
    {"name":"Pediatrics"}, // child specialist 
    {"name":"IVF & Infertility Treatment"},
    {"name":"Liver Transplantation"},
    {"name":"Psychiatry"}

  ];

  keyword = 'name';
  // data = [
  //    {
  //      id: 1,
  //      name: 'Usa'
  //    },
  //    {
  //      id: 2,
  //      name: 'England'
  //    }
  // ];

  constructor(private router: Router,private toastr: ToastrService, private _apiservice: APIService,private utilityservice:UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_ExpertiseList();
  }

  get f() { return this.expertiesMasterForm.controls; }


  Get_ExpertiseList() {
    let dataobj = {
    };
    this._apiservice.Get_ExpertiseList(dataobj).subscribe(data => {
      if (data) {
        console.log("Get_ExpertiseListGet_ExpertiseList", data);
        this.expertiesArrayData = [];
        for(var i=0;i<data.length;i++)
        {
          let dataobj:any={};
          dataobj.id=data[i]._id;
          dataobj.name=data[i].expertiseName;
          this.expertiesArrayData.push(dataobj);
        }
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }


  Save_Expertise() {
    this.submitted = true;
    if (this.expertiesMasterForm.invalid) {
      this.toastr.warning("Experties name is required");
      return;
    }
    this.errorMessage = "";
    let dataobj={};
    dataobj= this.expertiesMasterForm.value;
    this._apiservice.Save_Expertise(dataobj).subscribe(data => {
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
    this.expertiesMasterForm.patchValue({
      expertiseName:val
    })

  }
  
  onFocused(e){
    // do something when input is focused
  }
}



