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
  Update_DoctorProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_DoctorProfile +'/'+data.id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }



  Get_DoctorProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DoctorProfile+'/'+rolebasedid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
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

  Delete_Doctor(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Doctor+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
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

  Update_PatientProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PatientProfile +'/'+data.id}`
    return this.http.put<any>(APIURL, data)
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
  Update_NurseProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_NurseProfile +'/'+data.id}`
    return this.http.put<any>(APIURL, data)
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

  Update_PharmacistProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PharmacistProfile +'/'+data.id}`
    return this.http.put<any>(APIURL, data)
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

  Update_PhysioProfile(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PhysioProfile}`
    return this.http.put<any>(APIURL, data)
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

  Save_VisitCompleteIntimation(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_VisitCompleteIntimation}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Request_PatientMedicinesHomeDelivery(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Request_PatientMedicinesHomeDelivery}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Save_PharmaVisitCompleteIntimation(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_PharmaVisitCompleteIntimation}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
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
