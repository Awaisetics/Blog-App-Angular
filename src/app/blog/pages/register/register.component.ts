import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : any = '';
  email : any = '';
  password : any = '';

  registerErr = false;
  errorMsg = 'Something Went Wrong'
  loading = false;

  fg : any = null;
  fb = new FormBuilder();

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
    this.fg = this.fb.group({
      name: ['', [Validators.minLength(3)]],
      email : ['',[Validators.email]],
      password : ['',[Validators.minLength(3)]],
    });
    this.fg.valueChanges.subscribe((data : any) => console.log(data));
  }

  register(){
    this.registerErr = false;
    this.loading = true;
    const data : any = {
      name :  this.fg.get('name').value,
      email: this.fg.get('email').value,
      password: this.fg.get('password').value
    }
    if (!this.fg.get('name').errors && !this.fg.get('email').errors && !this.fg.get('password').errors) {
      this.authService.register(data).subscribe(
        (res: any) => {
          console.log(res.message);
          this.router.navigate(['/login']);
        },
        (err) => {
          this.registerErr = true;
          if(err.error.message){
            this.errorMsg = err.error.message;
          }
          else{
            this.errorMsg = err.error;
          }
          this.loading = false;
        },
      );
    } else {
      this.registerErr = true;
      this.errorMsg = 'Please Enter Valid Inputs';
      this.loading = false;
    }
  }

}

