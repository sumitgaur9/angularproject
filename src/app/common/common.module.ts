
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from '../loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';
import { NurseprofileComponent } from './nurseprofile/nurseprofile.component';
import { PharmacistprofileComponent } from './pharmacistprofile/pharmacistprofile.component';
import { PhyscotherapistprofileComponent } from './physcotherapistprofile/physcotherapistprofile.component';
import { RequestPatMedHomeDeliveryComponent } from './request-pat-med-home-delivery/request-pat-med-home-delivery.component';
import { PharmacistVisitCompleteIntimationComponent } from './pharmacist-visit-complete-intimation/pharmacist-visit-complete-intimation.component';
import { VisitforallComponent } from './visitforall/visitforall.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { DiseasmasterComponent } from './diseasmaster/diseasmaster.component';
import { ExpertiesmasterComponent } from './expertiesmaster/expertiesmaster.component';
import { MedicinemasterComponent } from './medicinemaster/medicinemaster.component';
import { CreatelabtestComponent } from './createlabtest/createlabtest.component';
import { CreatelabtestpackageComponent } from './createlabtestpackage/createlabtestpackage.component';
import { CreatebooklabtestComponent } from './createbooklabtest/createbooklabtest.component';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {DpDatePickerModule} from 'ng2-date-picker';
import { LabtechnicianprofileComponent } from './labtechnicianprofile/labtechnicianprofile.component';
import { UploadtestreportComponent } from './uploadtestreport/uploadtestreport.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';


@NgModule({
  declarations: [LoaderComponent,DoctorprofileComponent, ModalComponent, PatientprofileComponent, NurseprofileComponent, PharmacistprofileComponent, PhyscotherapistprofileComponent, RequestPatMedHomeDeliveryComponent, PharmacistVisitCompleteIntimationComponent, VisitforallComponent, BookappointmentComponent, DiseasmasterComponent, ExpertiesmasterComponent, MedicinemasterComponent, CreatelabtestComponent, CreatelabtestpackageComponent, CreatebooklabtestComponent, LabtechnicianprofileComponent, UploadtestreportComponent, ForgotpasswordComponent, ChangepasswordComponent, ImageuploadComponent, ConfirmationComponent, VerifyotpComponent],
   
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMultiSelectModule,
    DpDatePickerModule
    // NgMultiSelectDropDownModule.forRoot()
  ], exports: [
    LoaderComponent,
    DoctorprofileComponent,
    ModalComponent,
    PatientprofileComponent,
    NurseprofileComponent,
    PharmacistprofileComponent,
    PhyscotherapistprofileComponent,
    RequestPatMedHomeDeliveryComponent,
    PharmacistVisitCompleteIntimationComponent,
    VisitforallComponent,
    BookappointmentComponent,
    DiseasmasterComponent,
    ExpertiesmasterComponent,
    MedicinemasterComponent,
    CreatelabtestComponent,
    CreatelabtestpackageComponent,
    CreatebooklabtestComponent,
    LabtechnicianprofileComponent,
    UploadtestreportComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    ImageuploadComponent,
    ConfirmationComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QCommonModule { }