import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  auth_key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZjRjZmJiOGRmMzU0ZjAwMzcwMzdkOTkiLCJpYXQiOjE2ODE4NjgxODd9.mroeryf8TaPzg5pmOjDQZ-Xo2dU2UTmSQ3IfjKKZ4Jw';


  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let modifiedRequest = request.clone({
      headers: request.headers.append('Authorization', this.auth_key)
    });
    return next.handle(modifiedRequest);
  }
}
