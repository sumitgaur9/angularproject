import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  Update_DoctorProfile(data, doctorid) {
    let headers = new HttpHeaders({ "enctype": "multipart/form-data" });

    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_DoctorProfile + '/' + doctorid}`
    return this.http.put<any>(APIURL, data, { headers: headers })
      .pipe(map(userData => {
        return userData;
      }));
  }
  Get_DoctorProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DoctorProfile + '/' + rolebasedid}`
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

  Delete_Doctor(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Doctor + '/' + delid}`
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

  Get_PatientProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PatientProfile + '/' + rolebasedid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }



  Update_PatientProfile(data, id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PatientProfile + '/' + id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Delete_Patient(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Patient + '/' + delid}`
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
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_NurseProfile}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));

  }
  Update_NurseProfile(data, nurseId) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_NurseProfile + '/' + nurseId}`
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

  Delete_Nurse(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Nurse + '/' + delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_NurseProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_NurseProfile + '/' + rolebasedid}`
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

  Update_PharmacistProfile(data, id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PharmacistProfile + '/' + id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Delete_Pharmacist(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Pharmacist + '/' + delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_PharmacistsList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmacistsList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_PhysioProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PhysioProfile + '/' + rolebasedid}`
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

  Delete_Physio(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Physio + '/' + delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Update_PhysioProfile(data, id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_PhysioProfile + '/' + id}`
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




  Get_PharmacistProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmacistProfile + '/' + rolebasedid}`
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
          sessionStorage.setItem("userToken", JSON.stringify(userData));
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
            sessionStorage.setItem("currentusermedata", JSON.stringify(resdata));
          }

        }
        return resdata;
      }));
  }

  logout(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.logout}`
    return this.http.post<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        sessionStorage.clear();
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




  Get_FilteredDoctors(params, experties) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_FilteredDoctors + '/' + experties}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  Get_AppointmentsByDocID(params) {
    // let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByDocID}`

    // let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByDocID+'/'+doctorID}`
    // return this.http.get<any>(APIURL, { params: params })
    //   .pipe(map(resdata => {
    //     if (resdata) {
    //     }
    //     return resdata;
    //   }));

    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByDocID}`
    return this.http.post<any>(APIURL, params)
      .pipe(map(userData => {
        return userData;
      }));

  }



  Save_Medicine(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Medicine}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }


  Get_MedicinesList(params, companyName) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MedicinesList}`
    if (companyName) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MedicinesList + '/' + companyName}`
    }
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_PharmaReqForHomeDel(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmaReqForHomeDel}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_AppointmentsByPatientID(params, patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_AppointmentsByPatientID + '/' + patientID}`
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



  Save_BookLabTest(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_BookLabTest}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_LabTestsPackageList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsPackageList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }
  


  Get_UploadPrescriptionForMedicineApprovalsList(params, patientID?) {

    let APIURL;
    if (patientID) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_UploadPrescriptionForMedicineApprovalsList + '/' + patientID}`
    }
    else {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_UploadPrescriptionForMedicineApprovalsList}`
    }

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


  Get_DiseaseWiseApptCount(params, doctorID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DiseaseWiseApptCount + '/' + doctorID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_MonthlyHomeOnlineApptCount(params, doctorID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MonthlyHomeOnlineApptCount + '/' + doctorID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_MedicineWiseApptCount(params, doctorID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_MedicineWiseApptCount + '/' + doctorID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Get_PharmacistWiseApptCount(params, doctorID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PharmacistWiseApptCount + '/' + doctorID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_DoctorWiseApptCount(params, patientID) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_DoctorWiseApptCount + '/' + patientID}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Get_LabTestWiseTestCount(params, patientID?) {
    let APIURL;
    if (patientID) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestWiseTestCount + '/' + patientID}`
    }
    else {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestWiseTestCount}`
    }
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_IndividualToPackageLabTestCount(params, patientID) {
    let APIURL;
    if (patientID) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_IndividualToPackageLabTestCount + '/' + patientID}`
    }
    else {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_IndividualToPackageLabTestCount}`
    }
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

  
  Save_UploadPrescriptionForMedicineApproval(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_UploadPrescriptionForMedicineApproval}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  } 

  Save_ApproveMedicineReqUsingPrescription(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_ApproveMedicineReqUsingPrescription}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }  

  Update_BuyStatusForApprovedMedicine(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_BuyStatusForApprovedMedicine}`
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



  Delete_LabTest(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_LabTest + '/' + delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Get_LabTestsBookings(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsBookings}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }


  Update_LabTechnicianProfile(data, id) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_LabTechnicianProfile + '/' + id}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  Get_LabTechnicianProfile(params, rolebasedid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTechnicianProfile + '/' + rolebasedid}`
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

  Get_UploadedTestReportbyLabTestID(params, booklabtestid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_UploadedTestReportbyLabTestID + '/' + booklabtestid}`
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

  GenerateOTPToPhone(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.GenerateOTPToPhone}`
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

  Get_WebsiteImageByLocationEnum(params, locationenum) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_WebsiteImageByLocationEnum + '/' + locationenum}`
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

  Delete_LabTestsPackage(params, packageid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_LabTestsPackage + '/' + packageid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Delete_LabTechnician(params, labtechnicianid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_LabTechnician + '/' + labtechnicianid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Update_LabTest(data, labtestid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_LabTest + '/' + labtestid}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  Save_LabTest(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_LabTest}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  Get_LabTest(params, labtestid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTest + '/' + labtestid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
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

  Update_LabTestsPackage(data, labtestpackageid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_LabTestsPackage + '/' + labtestpackageid}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }
  Get_LabTestsPackage(params, labtestpackageid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_LabTestsPackage + '/' + labtestpackageid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_NewPatientProfileFromBookAppointment(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_NewPatientProfileFromBookAppointment}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }



  orders(data) {
    //let APIURL = 'https://api.roazorpay.com/v1/orders'
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.createOrder}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  paymentverify(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.paymentverify}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  SaveUpdate_WebsiteTextData(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.SaveUpdate_WebsiteTextData}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_WebsiteTextDataByLocationEnum(params, locationenum) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_WebsiteTextDataByLocationEnum + '/' + locationenum}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_WebsiteTextDataByLocationEnumList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_WebsiteTextDataByLocationEnumList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Update_Medicine(data, medicineid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Update_Medicine + '/' + medicineid}`
    return this.http.put<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_Medicine(params, medicineid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_Medicine + '/' + medicineid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Delete_Medicine(params, delid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Delete_Medicine + '/' + delid}`
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_PaymentLists(params, paymentTypeEnumKey) {
    let APIURL;
    if (paymentTypeEnumKey) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PaymentLists + '/' + paymentTypeEnumKey}`
    }
    else {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PaymentLists}`
    }
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Save_AddtoCart(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_AddtoCart}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_CartDetails(params, userid) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_CartDetails + '/' + userid}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  RemoveCartDetails(params, userId, itemID?) {
    let APIURL;
    if (userId && itemID) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.RemoveCartDetails + '/' + userId + '/' + itemID}`
    }
    else {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.RemoveCartDetails + '/' + userId}`
    }
    return this.http.delete<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }

  Get_CompanyList(params) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_CompanyList}`
    return this.http.get<any>(APIURL, { params: params })
      .pipe(map(resdata => {
        if (resdata) {
        }
        return resdata;
      }));
  }


  Save_Company(data) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Save_Company}`
    return this.http.post<any>(APIURL, data)
      .pipe(map(userData => {
        return userData;
      }));
  }

  Get_PatientMedicinesHomeDelivery(params, appointmentID?) {
    let APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PatientMedicinesHomeDelivery}`
    if (appointmentID) {
      APIURL = `${API_PATH.Commaon_Path + API_PATH.API_VERSION_V1 + API_PATH.Get_PatientMedicinesHomeDelivery + '/' + appointmentID}`
    }
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
