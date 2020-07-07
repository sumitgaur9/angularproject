import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class UtililtyFunctions {
    public onLoginSuccessfully: Subject<any> = new Subject<any>();
    public onLogoutSuccessfully: Subject<any> = new Subject<any>();
    isUserLoggedIn() {
        let loginedUserData = JSON.parse(window.localStorage.getItem("userToken"));  //need to do get current user data api need 
        if (loginedUserData && loginedUserData != null) {
            return loginedUserData;
        }
        return false;
    }

    isUserTokenPresent(){
        let userToken = JSON.parse(window.localStorage.getItem("userToken"));
        if (userToken && userToken != null) {
            return userToken;
        }
        return false;
    }

}