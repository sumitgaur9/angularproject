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
  Update_DoctorProfile(data,doctorid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_DoctorProfile +'/'+doctorid}`
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

  Get_PatientProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PatientProfile+'/'+rolebasedid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  

  Update_PatientProfile(data,id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PatientProfile +'/'+id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Delete_Patient(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Patient+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
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
  Update_NurseProfile(data,nurseId) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_NurseProfile +'/'+nurseId}`
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

  Delete_Nurse(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Nurse+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_NurseProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_NurseProfile+'/'+rolebasedid}`
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

  Update_PharmacistProfile(data,id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PharmacistProfile +'/'+id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Delete_Pharmacist(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Pharmacist+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
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

  Get_PhysioProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PhysioProfile+'/'+rolebasedid}`
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

  Delete_Physio(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Physio+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Update_PhysioProfile(data,id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PhysioProfile +'/'+id}`
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


  

  Get_PharmacistProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmacistProfile+'/'+rolebasedid}`
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

  userme(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.userme}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
          if (resdata && resdata.roleBaseId) {
            localStorage.setItem("currentusermedata", JSON.stringify(resdata));
          }

        }
        return resdata;
      }));
  }

  logout(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.logout}`
    return this.http.post<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
          localStorage.clear();
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

  Save_BookAppointment(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_BookAppointment}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Save_Disease(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Disease}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }
  Save_Expertise(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Expertise}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }


  Get_DiseasesList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DiseasesList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_ExpertiseList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_ExpertiseList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  

  Get_FilteredDoctors(params,experties) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_FilteredDoctors+'/'+experties}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  Get_AppointmentsByDocID(params,doctorID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByDocID+'/'+doctorID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  


  Save_Medicine(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Medicine}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  
  Get_MedicinesList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH. Get_MedicinesList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_PharmaReqByPhamacistID(params,pharmacistID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmaReqByPhamacistID+'/'+pharmacistID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  
  Get_AppointmentsByPatientID(params,patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByPatientID+'/'+patientID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Get_LabTestsList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_LabTest(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_LabTest}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Save_LabTestsPackage(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_LabTestsPackage}`
    //let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Image}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Save_BookLabTest(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_BookLabTest}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  
  Get_LabTestsPackage(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsPackage}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_CommonDashboardCount(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_CommonDashboardCount}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  
  Get_DiseaseWiseApptCount(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DiseaseWiseApptCount}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_MonthlyHomeOnlineApptCount(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MonthlyHomeOnlineApptCount}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  
  Get_MedicineWiseApptCount(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MedicineWiseApptCount}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  
  Get_PharmacistWiseApptCount(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmacistWiseApptCount}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_DoctorWiseApptCount(params,patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DoctorWiseApptCount+'/'+patientID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Get_LabTestWiseTestCount(params,patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestWiseTestCount+'/'+patientID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_IndividualToPackageLabTestCount(params,patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_IndividualToPackageLabTestCount+'/'+patientID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_Image(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Image}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Save_UploadLabTestReport(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_UploadLabTestReport}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  

  Delete_LabTest(params,delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_LabTest+'/'+delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_LabTestsBookings(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsBookings}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Update_LabTechnicianProfile(data,id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_LabTechnicianProfile +'/'+id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  Get_LabTechnicianProfile(params,rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTechnicianProfile+'/'+rolebasedid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_LabTechniciansList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTechniciansList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_UploadedTestReportbyLabTestID(params,booklabtestid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_UploadedTestReportbyLabTestID+'/'+booklabtestid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  GenerateOTP(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.GenerateOTP}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  ChangePassword(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.ChangePassword}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  ForgotPassword(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Forgot_Password}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }
  SaveUpdate_UploadWebsiteImages(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.SaveUpdate_UploadWebsiteImages}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }

  Get_WebsiteImageByLocationEnum(params,locationenum) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_WebsiteImageByLocationEnum+'/'+locationenum}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  
    
  Get_WebsiteImageByLocationEnumList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_WebsiteImageByLocationEnumList}`
    return this.http.get<any>(APIURL, { params: params })
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
