import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegistrationComponent } from '../app/registration/registration.component';
import { HomeComponent } from '../app/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'home', component: HomeComponent },

    { path: '**', component: LoginComponent }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, { useHash: true })], // { useHash: true } -- testing for 404 problem on ctrl+F5 
    exports: [RouterModule]  
})
export class AppRoutingModule { }


