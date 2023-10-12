import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _ToastrService:ToastrService ,private _AuthService:AuthService , private _Router:Router ){}

  loginForm: FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required , Validators.email]),
    password : new FormControl('',[Validators.required , Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).*$")]),
  });

  visible: boolean = false;
  changetype: boolean = true; 
   viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  //re password
  visiblere: boolean = false;
  changetypere: boolean = true; 
  viewrepass() {
    this.visiblere = !this.visiblere;
    this.changetypere = !this.changetypere;
  }

  isLoding:boolean = false;

  handleLogin(): void{

    this.isLoding = true;
    
    if(this.loginForm.valid){
      this._AuthService.loginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          if (res.message === "success"){
            localStorage.setItem('token',res.token);
            this._AuthService.saveUser();
            this._Router.navigate(['/Home']);
          }
          this.isLoding = false;
        },
        error:(err)=>{
          this.isLoding = false;
          
          this._ToastrService.error(err.error.message);
        }
      })
    }
  }

}
