import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmaAdminCountService {

  api = config.API_PHARMA_ADMIN;

  constructor(private http:HttpClient) { }  

  getCountOfPharmaAdmin(){
    return this.http.get(this.api, {
      observe: 'response'
    });  
  }
}
