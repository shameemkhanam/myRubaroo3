import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetTotalDoctorsService {
  api = config.API_TOT_DOCS;
  api_doctors_list = config.API_ALL_DOCTORS_LIST;
  api_getSpecialities = config.API_SPECIALITIES;
  api_getLocation = config.API_LOCATION;
  api_profile_updates = config.API_UPDATED_PROFILE;
  // auth_key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRjZmJiOGRmMzU0ZjAwMzcwMzdkOTkiLCJpYXQiOjE2ODE4NjgxODd9.mroeryf8TaPzg5pmOjDQZ-Xo2dU2UTmSQ3IfjKKZ4Jw';
  api_getQualifications = config.API_QUALIFICATIONS;
  api_getAllDoctors_Not_Verified = config.API_DOCTORS_NOT_VERIFIED;
  api_getAllDoctorsFilter = config.API_ALL_DOCTORS_FILTER;
  api_update_doctor = config.API_UPDATE_DOCTOR;

  constructor(private http: HttpClient) {}

  getTotalDoctors() {
    return this.http.get(this.api, {
      observe: 'response',
    });
  }

  getAllDoctorsList() {
    return this.http.get(this.api_doctors_list, {
      observe: 'response',
    });
  }

  // putDoctor(data:any, id:string){
  //   return this.http.put(this.api_doctors_list +id, data);
  // }

  getSpecialities() {
    return this.http.get(this.api_getSpecialities, { observe: 'response' });
  }

  getLocations() {
    return this.http.get(this.api_getLocation, { observe: 'response' });
  }

  getProfileUpdates() {
    return this.http.get(this.api_profile_updates, { observe: 'response' });
  }

  getQualifications() {
    return this.http.get(this.api_getQualifications, { observe: 'response' });
  }

  getAllDoctorsFilter_NotVerified() {   
    return this.http.get(this.api_getAllDoctors_Not_Verified, 
      { observe: 'response' });
  }

  getAllDoctorsFilter(cityName,specialisation,createdAt,isVerified){
    const httpParams = new HttpParams({
        fromObject:{
          cityName:cityName,
          specialisation:JSON.stringify(specialisation),
          createdAt:createdAt,
          isVerified:isVerified
        }
      });
      
      return this.http.get(this.api_getAllDoctorsFilter, 
        { observe: 'response', params: httpParams });
  }

  updateDoctor(id){
    const updateHttpParams = new HttpParams({
      fromObject:{
        docId: id
      }
    });

    return this.http.put(this.api_update_doctor, 
      { observe: 'response', params : updateHttpParams});
  }
}
