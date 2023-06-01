import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveAuditService {

  api_save_audit = config.API_SAVE_AUDIT;

  constructor(private http:HttpClient) { }

  saveAudit(data:any){
    return this.http.post<any>(this.api_save_audit, data, {observe:'response'});
  }

}
