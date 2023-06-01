import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditQuestionsDialogComponent } from './add-edit-questions-dialog.component';

describe('AddEditQuestionsDialogComponent', () => {
  let component: AddEditQuestionsDialogComponent;
  let fixture: ComponentFixture<AddEditQuestionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditQuestionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditQuestionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
