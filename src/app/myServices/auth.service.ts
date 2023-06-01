import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from '../model/datatypes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = config.API_AUTH_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // /user login service
  userLogin(data: login) {
    return this.http.post<login>(this.api, data, { observe: 'response' });
    // this.http.post<login>(this.api, data, { observe: 'response' }).subscribe(
    //   (res) => {
    //     if (res && res.body) {
    //       localStorage.setItem('user', JSON.stringify(res.body));
    //       this.router.navigate(['/sidenav/dashboard']);
    //       this.toastr.success('Signed in successfully!');
    //     } else {
    //       this.toastr.error('Not Registered!');
    //     }
    //   },
    //   (err) => {
    //     this.toastr.error('Something went wrong!');
    //   }
    // );
  }
}
