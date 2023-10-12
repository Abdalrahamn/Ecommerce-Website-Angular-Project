import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  constructor(private _ToastrService:ToastrService ,private _AuthService:AuthService , private _Router:Router ){}
  

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
  loading: boolean = true;

  ngOnInit(): void {
    this.loading = false;
  }

  registerForm: FormGroup = new FormGroup({
    name : new FormControl('',[Validators.required , Validators.minLength(3) , Validators.maxLength(30)]),
    email : new FormControl('',[Validators.required , Validators.email]),
    password : new FormControl('',[Validators.required , Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).*$")]),
    rePassword : new FormControl('',[Validators.required , Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).*$")]),
    phone : new FormControl('',[Validators.required , Validators.pattern(/^(\+201)[0125][0-9]{8}$/)]),
  });

  handleRegistration(): void{

    //create function for confirm password with password confirmation
    if(this.registerForm.get('password')?.value !== this.registerForm.get('rePassword')?.value){
      this._ToastrService.error("Password confirmation does not match password ");
      return;
    }

    this.isLoding = true;
    
    if(this.registerForm.valid){
      this._AuthService.registerForm(this.registerForm.value).subscribe({
        next:(res)=>{
          if (res.message === "success"){
            this._Router.navigate(['/Login']);
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
