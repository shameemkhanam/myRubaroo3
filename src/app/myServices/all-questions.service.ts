import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllQuestionsService {
  api_all_questions = config.API_ALL_QUESTIONS;
  // api_all_answer_types = config.API_ALL_ANSWER_TYPES;
  api_all_active_pharma = config.API_ALL_ACTIVE_PHARMA;
  api_create_question = config.API_CREATE_QUESTION;
  api_delete_question = config.API_DELETE_QUESTION;
  api_update_question = config.API_UPDATE_QUESTION;

  allAnswerTypes: any = [
    { id: 1, type: 'Multi-select' },
    { id: 2, type: 'Single-select' },
    { id: 3, type: 'Yes/No Select' },
    { id: 4, type: 'Text' }
  ];

  private _refresh = new Subject();

  constructor(private http: HttpClient) {}

  get refresh() {
    return this._refresh;
  }

  getAllQuestions() {
    return this.http.get(this.api_all_questions, {
      observe: 'response',
    });
  }

  // getAllAnswerTypes(){
  //   return this.http.get(this.api_all_answer_types, { observe: 'response' });
  // }

  getAllActivePharma() {
    return this.http.get<any>(this.api_all_active_pharma, { observe: 'response' });
  }

  createQuestion(data:FormData){
    return this.http.post<any>(this.api_create_question, data)
    .pipe(
      (tap(() => {
        this._refresh.next(true);
      }))
    );
  }

  deleteQuestion(id){
    return this.http.delete(this.api_delete_question+id);
  }

  updateQuestion(data,id){
    return this.http.put(this.api_update_question + id+'/updateQuesions', data)
    .pipe(
      (tap(() => {
        this._refresh.next(true);
      }))
    );
  }
}
