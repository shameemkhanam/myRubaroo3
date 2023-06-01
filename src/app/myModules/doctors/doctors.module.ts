import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { ViewPopupComponent } from './view-popup/view-popup.component';
import { ProfileUpdatesComponent } from './profile-updates/profile-updates.component';


@NgModule({
  declarations: [
    DoctorsComponent,
    EditPopupComponent,
    ViewPopupComponent,
    ProfileUpdatesComponent
    
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    NgbTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRadioModule
  ]
})
export class DoctorsModule { }
