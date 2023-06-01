import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/myServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  slides = [
    { heading: 'Welcome', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. magna aliqua.' },
    { heading: 'Welcome', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua' }
  ];

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {

      if(this.loginForm.valid){
        this.authService.userLogin(this.loginForm.value).subscribe((res)=>{
          console.log(res.body['status']);
          if(res.body['status'] === 'BAD'){
            this.toastr.error(res.body['message']);
          }
          else{
            this.toastr.success('Signed in successfully!');
            this.router.navigate(['/sidenav/dashboard']);
          }
        },
        (err)=>{
          this.toastr.error('Something went wrong!');          
        });
      }
      else{
        this.loginForm.markAllAsTouched();
      }     
    
  }

}
