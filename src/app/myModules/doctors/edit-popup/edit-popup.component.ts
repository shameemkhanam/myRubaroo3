import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetTotalDoctorsService } from 'src/app/myServices/get-total-doctors.service';
import { doctor } from 'src/app/model/datatypes';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss'],
})
export class EditPopupComponent implements OnInit {
  specializations: string[] = [];
  qualifications: string[] = [];
  imgSrc:string='';
  isBankDetails:boolean=this.data.isBankDetails;


  detailsForm = this.fb.group({
    step1: this.fb.group({
      name: [this.data.userName],
      gender: [this.data.gender],
      age: [this.data.age],
      email: [this.data.email],
      phone: [this.data.phoneNumber],
      state: [this.data.stateAndCity[0].stateName],
      city: [this.data.stateAndCity[0].city['cityName']],
      pincode: [this.data.pincode],
      referedBy: [this.data.referedBy],
      firebaseId: [this.data.fireBaseId],
      specialization1: [this.data?.specialization[0]?.name],
      specialization2: [this.data?.specialization[1]?.name],
      specialization3: [this.data?.specialization[2]?.name],
      qualification: [this.data.qualification],
      registrationNo: [this.data.mcrn],
      experience: [this.data.experiencelevel],
    }),
    step2: this.fb.group({
      paymentOptions: [''],
      bankName:[this.data?.bankDetails?.bankName],
      accountHolderName:[this.data?.bankDetails?.accountHolderName],
      accountNo:[this.data?.bankDetails?.accountNumber],
      ifscCode:[this.data?.bankDetails?.ifsc],
      FullUpiIdPhoneNo: [this.data?.upiDetails?.upiId],
      imgurl:[this.data?.documents[0]?.filePath]
    }),
    step3: this.fb.group({
      level: [this.data?.doctorsLevel?.level],
    }),
  });

  constructor(
    private _getDocsService: GetTotalDoctorsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getSpecializations();
    this.getQualifications();   
    // console.log(this.data);
    // this.detailsForm.patchValue(this.data);
  }
  

  get step1form() {
    return this.detailsForm.get('step1') as FormGroup;
  }
  get step2form() {
    return this.detailsForm.get('step2') as FormGroup;
  }
  get step3form() {
    return this.detailsForm.get('step3') as FormGroup;
  }

  onUpdateClicked() {
    if (this.detailsForm.valid) {
      // console.log(this.detailsForm.value);
      
      // this._getDocsService.updateDoctor()
        
    }
  }

  getSpecializations() {
    this._getDocsService.getSpecialities().subscribe((res) => {
      let result = res.body['data'];
      for (let i of result) {
        this.specializations.push(i.specialityName);
      }
    });
  }

  getQualifications() {
    this._getDocsService.getQualifications().subscribe((res) => {
      let qualificationsRes = res.body['data'];
      for (let j of qualificationsRes) {
        this.qualifications.push(j.name);
      }
    });
  }
}
