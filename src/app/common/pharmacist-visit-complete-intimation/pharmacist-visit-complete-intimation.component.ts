
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtililtyFunctions } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/service/api.service';
import { defaultImage } from 'src/app/shared/api.constant'

@Component({
  selector: 'app-pharmacist-visit-complete-intimation',
  templateUrl: './pharmacist-visit-complete-intimation.component.html',
  styleUrls: ['./pharmacist-visit-complete-intimation.component.css']
})
export class PharmacistVisitCompleteIntimationComponent implements OnInit {
 
  @Input() showModal: boolean = false;
  @Input() userEmail = null;
  @Input() appointmentid: string = '';
  @Input() inputPharmacistVisitCompleteIntimationModalData: any;

  @Output() ClosePopup = new EventEmitter();
  @Output() forgotPasswordSet: EventEmitter<any> = new EventEmitter();

  public CloseModal(calllistapi) {
    this.ClosePopup.emit(calllistapi);
  }

  public finalMedicineData: any = [];
  public finalMedicineDataWithCount: any = [];
  public totalMedicineIDsData: any = [];
  public medDeliverIDNameArray: any = [];
  public getDefaultImage = defaultImage.labtestlink;
  public medicineListDataArray: any = [];
  public medicineToBeDeliver: any = [];
  public doctorListDataArray: any = [];
  public priceTotal = 0;
  public submitted = false;
  errorMessage = '';

  public pharmaVisitCompleteIntimationForm = new FormGroup({
    patientName: new FormControl(""),
    doctorName: new FormControl(""),
    pharmacyPersonContactNo: new FormControl(""),
    doctorID: new FormControl(""),
  });

  public passwordPatternError = false;
  public currentUser;

  constructor(private router: Router, private toastr: ToastrService, private _apiservice: APIService, private utilityservice: UtililtyFunctions) { }

  ngOnInit() {
    this.currentUser = JSON.parse(window.sessionStorage.getItem("userToken"));
    this.Get_MedicinesList();
    this.pharmaVisitCompleteIntimationForm.patchValue({
      patientName: this.inputPharmacistVisitCompleteIntimationModalData.patientName,
      doctorName: this.inputPharmacistVisitCompleteIntimationModalData.doctorName,
      doctorID: this.inputPharmacistVisitCompleteIntimationModalData.doctorID,
      pharmacyPersonContactNo: this.inputPharmacistVisitCompleteIntimationModalData.patientContactNo,
    })
  }

  getMedicineName(data) {
    this.medDeliverIDNameArray = [];
    for (var j = 0; j < data.medicinesData.length; j++) {
      let temp: any = {};
      temp.medicineSNo = data.medicinesData[j].medicineSNo;
      for (var k = 0; k < data.medicinesData[j].medicinesdataArrayForFixTimeSlot.length; k++) {
        let dataobj: any = {};
        this.getTotalMedicineIds(data.medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineID)
        dataobj.medicineName = data.medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineName;
        dataobj.medicineID = data.medicinesData[j].medicinesdataArrayForFixTimeSlot[k].medicineID;
        this.medDeliverIDNameArray.push(dataobj);
      }
    }
  }
  getTotalMedicineIds(medicineID) {
    this.totalMedicineIDsData.push(medicineID);
  }

  medicineIDOccuranceCount(medicineNameArray) {
    var a = [], b = [], prev;
    medicineNameArray.sort();
    for (var i = 0; i < medicineNameArray.length; i++) {
      if (medicineNameArray[i] !== prev) {
        a.push(medicineNameArray[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = medicineNameArray[i];
    }
    return [a, b];
  }


  finalMedicineIdNameWithOccurance(data) {
    this.priceTotal = 0;
    this.medicineToBeDeliver = [];
    for (var i = 0; i < data[0].length; i++) {
      let dataobj: any = {};
      dataobj.medicineID = data[0][i];            //data[0]==ids array
      dataobj.medicineOccurance = data[1][i];   //data[1]==ids com how many times array
      let getMedicineName = this.medDeliverIDNameArray.filter(function (item) {
        return item.medicineID == data[0][i];
      });
      if (getMedicineName) {
        dataobj.medicineName = getMedicineName[0].medicineName
      }
      let checkmedicinelistdata = this.medicineListDataArray.filter(function (item) {
        return item._id == data[0][i];
      });
      if (checkmedicinelistdata) {
        dataobj.price = dataobj.medicineOccurance * checkmedicinelistdata[0].price;
        dataobj.newimage = checkmedicinelistdata[0].newimage;
        dataobj.medicinePricePerUnit = checkmedicinelistdata[0].price;
        this.priceTotal = this.priceTotal + dataobj.price;
      }
      this.medicineToBeDeliver.push(dataobj);
    }
    console.log("medicineToBeDelivermedicineToBeDeliver", this.medicineToBeDeliver);
  }

  arrayBufferToBase64(buffer) {
    return this.utilityservice.arrayBufferToBase64(buffer);
  }
  get f() { return this.pharmaVisitCompleteIntimationForm.controls; }

  doctorChangeEvent($event) {
    let newArray = this.doctorListDataArray.filter(function (item) {
      return item.name == $event.target.value;
    });
    if (newArray) {
      this.pharmaVisitCompleteIntimationForm.patchValue(
        {
          doctorID: newArray[0]._id
        }
      )
    }
  }

  Save_PharmaVisitCompleteIntimation() {
    this.submitted = true;
    if (this.pharmaVisitCompleteIntimationForm.invalid) {
      return;
    }
    this.errorMessage = "";
    let dataobj: any = {};
    dataobj.patientName = this.pharmaVisitCompleteIntimationForm.controls.patientName.value;
    dataobj.appointmentId = this.appointmentid;
    dataobj.price = this.priceTotal;
    dataobj.doctorName = this.pharmaVisitCompleteIntimationForm.controls.doctorName.value;
    dataobj.doctorID = this.pharmaVisitCompleteIntimationForm.controls.doctorID.value;
    dataobj.pharmacyPersonContactNo = this.pharmaVisitCompleteIntimationForm.controls.pharmacyPersonContactNo.value;
    let medicinesData = [];
    for (var i = 0; i < this.medicineToBeDeliver.length; i++) {
      let tempDataObj: any = {};
      tempDataObj.medicineID = this.medicineToBeDeliver[i].medicineID;
      tempDataObj.medicineName = this.medicineToBeDeliver[i].medicineName;
      tempDataObj.medicinePricePerUnit = parseInt(this.medicineToBeDeliver[i].medicinePricePerUnit);
      tempDataObj.medicineQty = parseInt(this.medicineToBeDeliver[i].medicineOccurance);
      tempDataObj.medicineTotPrice = parseInt(this.medicineToBeDeliver[i].price);
      medicinesData.push(tempDataObj);
    }
    dataobj.medicinesData=medicinesData;
    this._apiservice.Save_PharmaVisitCompleteIntimation(dataobj).subscribe(data => {
      if (data) {
        this.toastr.success('thanks for pharmaVisitCompleteIntimationForm');
        this.CloseModal(true);
      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }
  Get_MedicinesList() {
    let dataobj = {
    };
    this._apiservice.Get_MedicinesList(dataobj).subscribe(data => {
      if (data) {
        this.medicineListDataArray = data;
        this.getMedicineName(this.inputPharmacistVisitCompleteIntimationModalData);
        this.finalMedicineIdNameWithOccurance(this.medicineIDOccuranceCount(this.totalMedicineIDsData));
        console.log("medicineListDataArray ", data);

      }
    }, error => {
      this.errorMessage = error.error.message; this.toastr.error(error.error.message);
    });
  }

}

