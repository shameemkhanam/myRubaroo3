import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SurveysCountService {
  api = config.API_SURVEYS;

  constructor(private http: HttpClient) {}

  getCountOfSurveys() {
    return this.http.get(this.api, {
      observe: 'response',
    });
  }
}
