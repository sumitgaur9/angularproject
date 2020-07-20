import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/app/shared/api.constant'
import { map } from 'rxjs/operators';

@Injectable({
  'providedIn': 'root'
})
export class APIService {

  constructor(public http: HttpClient) { }


  Save_DoctorProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_DoctorProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }


  Get_DoctorsList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DoctorsList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_PatientProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_PatientProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Get_PatientsList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PatientsList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_NurseProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH. Save_NurseProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Get_NursesList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_NursesList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Save_PharmacistProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_PharmacistProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }
  Get_PharmacistsList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH. Get_PharmacistsList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Save_PhysioProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_PhysioProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  

  Get_PhysiosList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PhysiosList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


 

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



  registration(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.registration}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  testheader(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.testtokenheader}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  logout(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.logout}`
    return this.http.post<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }



}




 // checkapidata(url) {
    //     return this.http.get<any>(this.APIURL)
    //         .pipe(map(userData => {
    //             return userData;
    //         }))
    // }
