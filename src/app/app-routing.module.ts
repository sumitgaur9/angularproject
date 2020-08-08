import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocationStrategy, Location, PathLocationStrategy} from '@angular/common';
import { LoginComponent } from '../app/login/login.component';
import { RegistrationComponent } from '../app/registration/registration.component';
import { HomeComponent } from '../app/home/home.component';
import { DoctorEditdisplaylistComponent } from '../app/doctoreditdisplaylist/doctoreditdisplaylist.component';
import { PatienteditdisplaylistComponent } from '../app/patienteditdisplaylist/patienteditdisplaylist.component'
import { NurseeditdisplaylistComponent } from './nurseeditdisplaylist/nurseeditdisplaylist.component';
import { PharmacisteditdisplaylistComponent } from './pharmacisteditdisplaylist/pharmacisteditdisplaylist.component';
import { PhyscotherapisteditdisplaylistComponent } from './physcotherapisteditdisplaylist/physcotherapisteditdisplaylist.component';
import { OtherlinksComponent } from './otherlinks/otherlinks.component'
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { PharmacistdashboardComponent } from './pharmacistdashboard/pharmacistdashboard.component';
import { PatientdashboardComponent } from './patientdashboard/patientdashboard.component';
import { BooklabtestComponent } from './booklabtest/booklabtest.component';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },
    { path: 'doctorlist', component: DoctorEditdisplaylistComponent },
    { path: 'patientlist', component: PatienteditdisplaylistComponent },
    { path: 'nurselist', component: NurseeditdisplaylistComponent },
    { path: 'pharmacistlist', component: PharmacisteditdisplaylistComponent },
    { path: 'physcotherapistlist', component: PhyscotherapisteditdisplaylistComponent },
    { path: 'physcotherapistlist', component: PhyscotherapisteditdisplaylistComponent },
    { path: 'otherlinks', component: OtherlinksComponent },
    { path: 'doctordashboard', component: DoctordashboardComponent },
    { path: 'pharmacistdashboard', component: PharmacistdashboardComponent },
    { path: 'patientdashboard', component: PatientdashboardComponent },
    { path: 'getlabtest', component: BooklabtestComponent },
    
    { path: '**', component: LoginComponent }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, { useHash: true })], // { useHash: true } -- testing for 404 problem on ctrl+F5 
  //  imports: [RouterModule.forRoot(routes)], // { useHash: true } -- testing for 404 problem on ctrl+F5
    exports: [RouterModule],
    // providers : [
    //   Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
    // ]
})
export class AppRoutingModule { }


