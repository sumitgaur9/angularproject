import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/app/shared/api.constant'
import { map } from 'rxjs/operators';

@Injectable({
    'providedIn': 'root'
})
export class APIService {

    constructor(public http: HttpClient) { }

    signIn(data) {
        let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.login}`
        return this.http.post<any>(APIURL, data)
            .pipe(map(userData => {
                if (userData && userData.token) {
                    localStorage.setItem("userToken", JSON.stringify(userData));
                }
                return userData;
            }));
    }

}




 // checkapidata(url) {
    //     return this.http.get<any>(this.APIURL)
    //         .pipe(map(userData => {
    //             return userData;
    //         }))
    // }
