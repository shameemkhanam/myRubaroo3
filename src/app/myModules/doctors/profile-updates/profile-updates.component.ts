import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetTotalDoctorsService } from 'src/app/myServices/get-total-doctors.service';

@Component({
  selector: 'app-profile-updates',
  templateUrl: './profile-updates.component.html',
  styleUrls: ['./profile-updates.component.scss']
})
export class ProfileUpdatesComponent implements OnInit{

  specializationArr:string[]=[];

  //columns for table
  displayedColumns: string[] = [
    'userName',
    'specialization',
    'level',
    'superFactor',
    'phoneNumber',
    'isVerified',    
    'action',
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _getTotalDocsService: GetTotalDoctorsService){}

  ngOnInit(): void {
    this.getProfileUpdates();
  }

  getProfileUpdates(){
    this._getTotalDocsService.getProfileUpdates().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res.body['results']);
      console.log(this.dataSource);
      
    });
  }

  getSpecializations(element: any): string {
    let specializations = '';

    element.doctorsDetail.specialization.forEach((specialization) => {
      specializations += specialization.name + ', ';
    });
    return specializations;
  }


}
