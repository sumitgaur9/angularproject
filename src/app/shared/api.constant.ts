export const API_PATH: any = {
    'Commaon_Path':'https://mongowithnode.herokuapp.com/',
    //  'Commaon_Path':'http://localhost:5000/',
    'GTM_ID': 'GTM-M476F8N',
    'API_VERSION_V1': 'api/userModel/',
    'login': 'users/login',
    'registration': 'users',
    'userme': 'users/me',
    'logout': 'users/me/logout',
    'Get_DoctorProfile': 'Get_DoctorProfile',
    'Save_DoctorProfile': 'Save_DoctorProfile',
    'Update_DoctorProfile': 'Update_DoctorProfile',
    'Get_DoctorsList': 'Get_DoctorsList',
    'Save_PatientProfile': 'Save_PatientProfile',
    'Get_PatientProfile': 'Get_PatientProfile',
    'Update_PatientProfile': 'Update_PatientProfile',
    'Get_PatientsList': 'Get_PatientsList',
    'Delete_Doctor': 'Delete_Doctor',
    'Delete_Patient': 'Delete_Patient',
    'Delete_Pharmacist': 'Delete_Pharmacist',
    'Delete_Nurse': 'Delete_Nurse',
    'Delete_Physio': 'Delete_Physio',
    'Save_VisitCompleteIntimation': 'Save_VisitCompleteIntimation',
    'Request_PatientMedicinesHomeDelivery': 'Request_PatientMedicinesHomeDelivery',
    'Save_PharmaVisitCompleteIntimation': 'Save_PharmaVisitCompleteIntimation',
    'Save_PharmacistProfile': 'Save_PharmacistProfile',
    'Get_PharmacistProfile':'Get_PharmacistProfile',
    'Update_PharmacistProfile': 'Update_PharmacistProfile',
    'Save_NurseProfile': 'Save_NurseProfile',
    'Update_NurseProfile': 'Update_NurseProfile',
    'Get_NurseProfile': 'Get_NurseProfile',
    'Save_PhysioProfile': 'Save_PhysioProfile',
    'Update_PhysioProfile': 'Update_PhysioProfile',
    'Get_PharmacistsList': 'Get_PharmacistsList',
    'Get_NursesList': 'Get_NursesList',
    'Get_PhysiosList': 'Get_PhysiosList',
    'Get_PhysioProfile': 'Get_PhysioProfile',
    'Save_BookAppointment': 'Save_BookAppointment',
    'Get_FilteredDoctors': 'Get_FilteredDoctors',
    'Get_AppointmentsByDocID': 'Get_AppointmentsByDocID',
    'getFilteredAppointments': 'getFilteredAppointments',
    'Save_Disease': 'Save_Disease',
    'Get_DiseasesList': 'Get_DiseasesList',
    'Get_ExpertiseList': 'Get_ExpertiseList',
    'Save_Expertise': 'Save_Expertise',
    'Save_Medicine': 'Save_Medicine',
    'Get_MedicinesList': 'Get_MedicinesList',
    'Get_PharmaReqForHomeDel': 'Get_PharmaReqForHomeDel',
    'Get_AppointmentsByPatientID': 'Get_AppointmentsByPatientID',
    'Get_LabTestsList': 'Get_LabTestsList',
    'Save_Image': 'api/photo',
    'Get_LabTestsPackage': 'Get_LabTestsPackage',
    'Get_LabTestsPackageList': 'Get_LabTestsPackageList',
    'Save_BookLabTest': 'Save_BookLabTest',
    'Save_LabTest': 'Save_LabTest',
    'Get_CommonDashboardCount': 'Get_CommonDashboardCount',
    'Get_DiseaseWiseApptCount': 'Get_DiseaseWiseApptCount',
    'Get_MedicineWiseApptCount': 'Get_MedicineWiseApptCount',
    'Get_PharmacistWiseApptCount': 'Get_PharmacistWiseApptCount',
    'Get_DoctorWiseApptCount': 'Get_DoctorWiseApptCount',
    'Get_LabTestWiseTestCount': 'Get_LabTestWiseTestCount',
    'Get_IndividualToPackageLabTestCount': 'Get_IndividualToPackageLabTestCount',
    'Get_MonthlyHomeOnlineApptCount': 'Get_MonthlyHomeOnlineApptCount',
    'Delete_LabTest': 'Delete_LabTest',
    'Delete_LabTestPackage': 'Delete_LabTestPackage',
    'Get_LabTestsBookings': 'Get_LabTestsBookings',
    'Get_LabTechniciansList': 'Get_LabTechniciansList',
    'Get_LabTechnicianProfile': 'Get_LabTechnicianProfile',
    'Update_LabTechnicianProfile': 'Update_LabTechnicianProfile',
    'Save_UploadLabTestReport': 'Save_UploadLabTestReport',
    'Get_UploadedTestReportbyLabTestID': 'Get_UploadedTestReportbyLabTestID',
    'GenerateOTP': 'GenerateOTP',
    'ChangePassword': 'users/changePassword',
    'Get_WebsiteImageByLocationEnum': 'Get_WebsiteImageByLocationEnum',
    'SaveUpdate_UploadWebsiteImages': 'SaveUpdate_UploadWebsiteImages',
    'Forgot_Password': 'users/forgotPassword',
    'Get_WebsiteImageByLocationEnumList': 'Get_WebsiteImageByLocationEnumList',
    'Delete_LabTestsPackage': 'Delete_LabTestsPackage',
    'Delete_LabTechnician': 'Delete_LabTechnician',
    'Update_LabTest': 'Update_LabTest',
    'Get_LabTest': 'Get_LabTest',
    'Update_LabTestsPackage': 'Update_LabTestsPackage',
    'Save_LabTestsPackage': 'Save_LabTestsPackage',
    'Get_LabTestPackage': 'Get_LabTestPackage',
    'Save_NewPatientProfileFromBookAppointment': 'Save_NewPatientProfileFromBookAppointment',
    'paymentverify':'payment/verify',
    'createOrder':'payment/creteOrder',
    'SaveUpdate_WebsiteTextData':'SaveUpdate_WebsiteTextData',
    'Get_WebsiteTextDataByLocationEnum':'Get_WebsiteTextDataByLocationEnum',
    'Get_WebsiteTextDataByLocationEnumList':'Get_WebsiteTextDataByLocationEnumList',
    'Update_Medicine':'Update_Medicine',
    'Get_Medicine':'Get_Medicine',
    'Delete_Medicine':'Delete_Medicine',
    'Get_PaymentLists':'Get_PaymentLists',
    'Save_AddtoCart':'Save_AddtoCart',
    'Get_CartDetails':'Get_CartDetails',
    'RemoveCartDetails':'RemoveCartDetails',
    'Get_CompanyList':'Get_CompanyList',
    'Save_Company':'Save_Company',
    

}

export const PATTERN_ERROR_MESSAGE = {
    password: 'Password must contain one letter,one number and one special character and length should be 6 to 20 characters.',
    email: 'Invalid Email id',
    billingRate: 'Invalid Billing rate. It should be upto 2 decimal only.',
    companyId: 'Only alphabets, numbers and special character (),-,. are allowed. ',
    companyAdminUserId: 'Only alphabets, numbers and special character (),-,.,@ are allowed.',
    storeCode: 'Only alphabets, numbers and special character (),-,. are allowed. ',
    storeName: 'Only alphabets, numbers and special character (),-,. are allowed. ',
    firstName: 'Only alphabets, numbers and special character _,. are allowed. ',
    lastName: 'Only alphabets, numbers and special character _,. are allowed. ',
    name: 'Only alphabets, numbers, space and special character _,. are allowed. ',
    gstNo: 'Only alphabets and numbers are allowed',
    panNo: 'Only alphabets and numbers are allowed',
    phoneno:'Ten Character allowed'
}
export const LoginError={
    inactiveUserMSG:'Login failed! This is an InActive Account !! To Deactivate, register with same credentials',
    activateAccountHint:'You are just one step away to accessing your account click on PLEASE ACTIVATE ACCOUNT'
}

export const RegistrationMsg={
    activateAccountHint:'You are just one step away to accessing your account please click on Send OTP to Reg button'
}

export const VerifyOTP={
    sendMobileNoStartMsg:'OTP is sent to ********',
    sendMobileNoEndMsg:' mobile no'
}
export const defaultImage={
    userlink:'https://i.dlpng.com/static/png/6191850-user-png-94-images-in-collection-page-2-user-png-800_800_preview.png',
    doctorlink:'https://i.pinimg.com/originals/8c/8b/37/8c8b3766126753c6d098cdb2e42cff49.png',
    patientlink:'https://w7.pngwing.com/pngs/452/997/png-transparent-computer-icons-patient-others-text-logo-medical.png',
    nurselink:'https://w7.pngwing.com/pngs/243/481/png-transparent-history-of-nursing-health-care-medicine-national-council-licensure-examination-nurse-blue-logo-medicine.png',
    physiolink:'https://www.clipartmax.com/png/middle/160-1600784_physical-therapy-icon-physical-therapy-assistant-logo.png',
    pharmacistlink:'https://icons.iconarchive.com/icons/icons-land/medical/256/People-Pharmacist-Male-icon.png',
    labtechnicianlink:'https://previews.123rf.com/images/dxinerz/dxinerz1801/dxinerz180102964/93710577-scientist-medical-laboratory-icon-vector-image-can-also-be-used-for-professionals-suitable-for-web-a.jpg',
    labtestlink:'https://previews.123rf.com/images/dxinerz/dxinerz1801/dxinerz180102964/93710577-scientist-medical-laboratory-icon-vector-image-can-also-be-used-for-professionals-suitable-for-web-a.jpg',
    medicinelink: 'https://images.moneycontrol.com/static-mcnews/2019/05/Pharma_medicines_health_drugs2-770x433.jpg',
}



export const firebase= {
    apiKey: "AIzaSyClG70mchAMak7Y3iJi-RfZsOQWcG52oWw",
    authDomain: "healthcare-app-6025d.firebaseapp.com",
    databaseURL: "https://healthcare-app-6025d.firebaseio.com",
    projectId: "healthcare-app-6025d",
    storageBucket: "healthcare-app-6025d.appspot.com",
    messagingSenderId: "571179537480",
    appId: "1:571179537480:web:23ead2864f7c7933fc747d",
    measurementId: "G-LXVLR8JQ89"
  }


  export const RAZORPAY= {
    KEY_ID: "rzp_test_S6Oc7OAUlNhPz3",
    SECRET_KEY: "9oad02hYU3YABqDfrd3msZfW",
  }


