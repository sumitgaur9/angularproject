import { environment } from './../environments/environment';
import { API_PATH } from 'src/app/shared/api.constant'

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { QCommonModule } from 'src/app/common/common.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AuthInterceptor } from './service/auth-interceptor.service';
import { LoaderInterceptorService } from './service/loader-interceptor.service';
import { DoctorEditdisplaylistComponent } from './doctoreditdisplaylist/doctoreditdisplaylist.component';
import { PatienteditdisplaylistComponent } from './patienteditdisplaylist/patienteditdisplaylist.component';
import { NurseeditdisplaylistComponent } from './nurseeditdisplaylist/nurseeditdisplaylist.component';
import { PharmacisteditdisplaylistComponent } from './pharmacisteditdisplaylist/pharmacisteditdisplaylist.component';
import { PhyscotherapisteditdisplaylistComponent } from './physcotherapisteditdisplaylist/physcotherapisteditdisplaylist.component';
import { OtherlinksComponent } from './otherlinks/otherlinks.component';
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { PharmacistdashboardComponent } from './pharmacistdashboard/pharmacistdashboard.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { BooklabtestComponent } from './booklabtest/booklabtest.component';
//import { DoctorprofileComponent } from './common/doctorprofile/doctorprofile.component';
import { ChartsModule } from 'ng2-charts';
import { NursedashboardComponent } from './nursedashboard/nursedashboard.component';
import { LabtechnicianeditdisplaylistComponent } from './labtechnicianeditdisplaylist/labtechnicianeditdisplaylist.component';
import { LabtechniciandashboardComponent } from './labtechniciandashboard/labtechniciandashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DoctorEditdisplaylistComponent,
    PatienteditdisplaylistComponent,
    NurseeditdisplaylistComponent,
    PharmacisteditdisplaylistComponent,
    PhyscotherapisteditdisplaylistComponent,
    OtherlinksComponent,
    DoctordashboardComponent,
    PharmacistdashboardComponent,
    PatientdashboardComponent,
    BooklabtestComponent,
    NursedashboardComponent,
    LabtechnicianeditdisplaylistComponent,
    LabtechniciandashboardComponent,
   // DoctorprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ChartsModule,

    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }), // ToastrModule added
    QCommonModule
  ],
  //schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: 'googleTagManagerId',
       useValue: API_PATH.GTM_ID
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }