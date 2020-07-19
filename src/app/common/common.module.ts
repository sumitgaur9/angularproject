import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';
import { PatientprofileComponent } from './patientprofile/patientprofile.component';

@NgModule({
  declarations: [DoctorprofileComponent, ModalComponent, PatientprofileComponent],
   
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], exports: [
    DoctorprofileComponent,
    ModalComponent,
    PatientprofileComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QCommonModule { }
