import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { doctor } from 'src/app/model/datatypes';
import { GetTotalDoctorsService } from 'src/app/myServices/get-total-doctors.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { find, map } from 'rxjs';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  isDisable: boolean = false;

  newReg: number = 0;
  pendingDocs: number = 0;
  profileUpdates: number = 0;
  specializationCount: number = 0;

  cityName: string = '';
  createdAt: string = '';
  specialization: string = '';
  isVerified: boolean = true;

  //columns for table
  displayedColumns: string[] = [
    'userName',
    'specialization',
    'level',
    'superFactor',
    'phoneNumber',
    'isVerified',
    'referedBy',
    'createdAt',
    'action',
  ];

  //data for table
  dataSource: MatTableDataSource<doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  apiResponse: any;

  location: string[] = [];
  cities: string[] = [];
  citiesOptions: string[] = [];
  specialization1: string[] = [];
  specializationsWithId: string[] = [];
  specArr: string[] = [];
  status: boolean = true;

  constructor(
    private _getDocsService: GetTotalDoctorsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDocsInfo();
    this.getDoctorsList();

    //getting all speciality names
    this._getDocsService.getSpecialities().subscribe((res) => {
      let result = res.body['data'];

      this.specializationsWithId = result;

      for (let i of result) {
        this.specialization1.push(i.specialityName);
        // this.specializationId.push(i._id);
      }
      this.specialization1.sort();
    });

    //getting all city names
    this._getDocsService.getLocations().subscribe((res1) => {
      let result1 = res1.body['data'];
      for (let j of result1) {
        this.location.push(j.city);
      }
      for (let k of this.location) {
        for (let k1 of k) {
          this.cities.push(k1);
        }
      }
      for (let city of this.cities) {
        this.citiesOptions.push(city['cityName']);
      }
      this.citiesOptions.sort();
    });
  }

  onDisableUser() {
    this.isDisable = !this.isDisable;
    if (this.isDisable) {
      confirm('do you want to disable?');
    } else {
      confirm('do you want to enable?');
    }
  }

  //getting doctors data
  getDocsInfo() {
    this._getDocsService.getTotalDoctors().subscribe((res) => {
      this.newReg = res.body['data']['ragisterUser'];
      this.pendingDocs = res.body['data']['pendingVerification'];
      this.profileUpdates = res.body['data']['updateProfiles'];
      this.specializationCount = res.body['data']['specialization'];
    });
  }

  //getting doctors list for table
  getDoctorsList() {
    this._getDocsService.getAllDoctorsList().subscribe((res) => {
      if (res.body['results']) {
        console.log(res.body['results']);
        this.apiResponse = res.body['results'];
        this.dataSource = new MatTableDataSource(this.apiResponse);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      }
    });
  }

  getSpecializations(element: any): string {
    let specializations = '';

    element?.specialization.forEach((specialization) => {
      specializations += specialization?.name + ', ';
    });
    return specializations;
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onStatusChange(event) {
    if (!event.checked) {
      this.status = false;
      this._getDocsService
        .getAllDoctorsFilter_NotVerified()
        .subscribe((res) => {
          this.apiResponse = res.body['results'];
          this.dataSource = new MatTableDataSource(this.apiResponse);
        });
    } else {
      this.status = true;
      this.getDoctorsList();
    }
  }

  onFilter() {
    const date = new DatePipe('en-US').transform(this.createdAt, 'yyyy-MM-dd');
    this._getDocsService
      .getAllDoctorsFilter(
        this.cityName,
        this.specialization,
        date,
        this.isVerified
      )
      .subscribe((res) => {
        this.apiResponse = res.body['results'];
        this.dataSource = new MatTableDataSource(this.apiResponse);
      });
  }

  onSpecChange(specialisation) {
    this.specArr.push(specialisation._id);

    this._getDocsService
      .getAllDoctorsFilter(
        this.cityName,
        this.specArr,
        this.createdAt,
        this.isVerified
      )
      .subscribe((res) => {
        this.apiResponse = res.body['results'];
        this.dataSource = new MatTableDataSource(this.apiResponse);
      });
  }

  onEdit(mydata) {
    console.log(mydata);    

    const dialogRef = this.dialog.open(EditPopupComponent, {
      data: mydata,
    });

    dialogRef.afterClosed().subscribe((result)=>{

    });

    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = mydata;

    // var dialogRef: MatDialogRef<EditPopupComponent>;
    // dialogRef = this.dialog.open(EditPopupComponent, dialogConfig);
  }
}
