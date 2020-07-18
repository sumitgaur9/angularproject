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
import { LoaderComponent } from './loader/loader.component';
import { DoctorEditdisplaylistComponent } from './doctoreditdisplaylist/doctoreditdisplaylist.component';
import { ModalComponent } from './modal/modal.component';
//import { DoctorprofileComponent } from './common/doctorprofile/doctorprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    DoctorEditdisplaylistComponent,
    ModalComponent,
   // DoctorprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
