import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandMessagesRoutingModule } from './brand-messages-routing.module';
import { BrandMessagesComponent } from './brand-messages.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { AddEditQuestionsDialogComponent } from './add-edit-questions-dialog/add-edit-questions-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRippleModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
  declarations: [BrandMessagesComponent, AddEditQuestionsDialogComponent],
  imports: [
    CommonModule,
    BrandMessagesRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatCheckboxModule
  ],
})
export class BrandMessagesModule {}
