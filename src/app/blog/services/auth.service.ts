import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = localStorage.getItem("token") ? true : false;

  constructor(private httpClient : HttpClient , private router : Router) { }
  
  register(data : any){
    return this.httpClient.post('http://localhost:3000/user/register', data);
  }
  
  login(data : any){
    return this.httpClient.post('http://localhost:3000/user/login', data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
