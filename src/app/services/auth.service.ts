import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  saveUser(){
    const encode = localStorage.getItem('token');
    if (encode){
      const decode = jwtDecode(encode);
      this.userData = decode;
    }
    
  }

  constructor(private _HttpClient:HttpClient) { }

  registerForm(userData: object):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData);
  }
  loginForm(userData: object):Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData);
  }

  sendEmail(email: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      { email: email }
    );
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      { resetCode: resetCode }
    );
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      email: email,
      newPassword: newPassword,
    });
  }
}
