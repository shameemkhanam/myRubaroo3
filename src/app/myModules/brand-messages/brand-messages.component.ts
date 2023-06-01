import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { doctor } from 'src/app/model/datatypes';
import { AllQuestionsService } from 'src/app/myServices/all-questions.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditQuestionsDialogComponent } from './add-edit-questions-dialog/add-edit-questions-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-messages',
  templateUrl: './brand-messages.component.html',
  styleUrls: ['./brand-messages.component.scss'],
})
export class BrandMessagesComponent implements OnInit {
  //columns for table
  displayedColumns: string[] = [
    'slNo',
    'question',
    'questionType',
    'pharmaCompany',
    'comment',
    'action',
  ];
  //data for table
  dataSource: MatTableDataSource<doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private _allQuestionsService: AllQuestionsService,
    private dialog: MatDialog,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._allQuestionsService.refresh.subscribe(() => {
      this.getAllQuestions();
    });
    this.getAllQuestions();
  }

  getAllQuestions() {
    this._allQuestionsService.getAllQuestions().subscribe((res) => {
      // console.log(res.body['results']);
      if (res.body['results']) {
        this.dataSource = new MatTableDataSource(res.body['results']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      }
    });
  }

  openDialog() {
    this.dialog.open(AddEditQuestionsDialogComponent, {
      width: '70%',
    });
  }

  onEdit(element:any){
    this.dialog.open(AddEditQuestionsDialogComponent, {
      width: '70%',
      data: element
    })
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this question?')) {
      this._allQuestionsService.deleteQuestion(id).subscribe(
        (res) => {
          this._toastrService.success('Question deleted successfully!');
          this.getAllQuestions();
        },
        (err) => {
          this._toastrService.error('Error in deleting the question!');
        }
      );
    }
  }
}
