import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : any = '';
  password : any = '';
  
  loginErr = false;
  errorMsg = 'Something Went Wrong'
  loading = false;
  submitted = false;

  fg : any = null;
  fb = new FormBuilder();

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(['/dashboard']);
    }
    this.fg = this.fb.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required, Validators.minLength(3)]],
    });
  }

  login(){
    this.submitted = true;
    this.loading = true;
    this.loginErr = false;
    const data: any = {
      email: this.fg.get('email').value,
      password: this.fg.get('password').value
    }
    if (this.fg.valid) {
      this.authService.login(data).subscribe(
        (data: any) => {
          localStorage.setItem('token',data.token);
          this.authService.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.loginErr = true;
          this.errorMsg = err.error.message;
          this.loading = false;
        },
      );
    } else {
      this.loading = false;
    }
  }

}
