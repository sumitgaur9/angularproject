import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { LoaderComponent } from './loader/loader.component';
import { ModalComponent } from './modal/modal.component';
import { DoctorprofileComponent } from './doctorprofile/doctorprofile.component';

@NgModule({
  declarations: [DoctorprofileComponent, ModalComponent],
   
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], exports: [
    DoctorprofileComponent,
    ModalComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class QCommonModule { }
