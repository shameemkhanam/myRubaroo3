import { Component, OnInit } from '@angular/core';
import { GetTotalDoctorsService } from 'src/app/myServices/get-total-doctors.service';
import { PharmaAdminCountService } from 'src/app/myServices/pharma-admin-count.service';
import { SurveysCountService } from 'src/app/myServices/surveys-count.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalDoctors: number = 0;
  pendingDoctors: number = 0;
  activeSurveys:number=0;
  pharmaAdminCount:number=0;

  constructor(private _getTotalDocs: GetTotalDoctorsService, 
    private _getSurveyCount: SurveysCountService,
    private _getPharmaCount: PharmaAdminCountService) {}

  ngOnInit(): void {
    this.getTotalDocs();
    this.getActiveSurveys();
    this.getPharmaAdminCount();
  }

  //getting all 4 boxes data
  getTotalDocs() {
    this._getTotalDocs.getTotalDoctors().subscribe((res) => {
      this.totalDoctors = res.body['data']['totalDoctors'];
      this.pendingDoctors = res.body['data']['pendingVerification'];
    });
  }

  getActiveSurveys(){
    this._getSurveyCount.getCountOfSurveys().subscribe((res)=>{
      this.activeSurveys = res.body['data']['activeSurveys'];
    })
  }

  getPharmaAdminCount(){
    this._getPharmaCount.getCountOfPharmaAdmin().subscribe((res)=>{
      this.pharmaAdminCount = res.body['data']['totalCompanies'];
    })
  }
}
