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

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    
      arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return 'data:image/jpg;base64,' + window.btoa(binary);
      }
}