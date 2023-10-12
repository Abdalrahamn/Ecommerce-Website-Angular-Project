import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  
  constructor(private _AuthService:AuthService , private _Router:Router) { }

  phase:number = 1;
  email:string = ''
  resetCode:string  = '';
  newPassword:string = '';
  error:string = '';


  sendEmail(email: string) {
    this._AuthService.sendEmail(email).subscribe((response) => {
      this.phase = 2;
    });
  }

  verifyResetCode(resetCode: string) {
    this._AuthService.verifyResetCode(resetCode).subscribe((response) => {
      this.phase = 3;
    });
  }

  updatePassword(newPassword: string) {
    this._AuthService.updatePassword(this.email, newPassword).subscribe((response) => {
      this._Router.navigate(['/Login']);
    });
  }
}
