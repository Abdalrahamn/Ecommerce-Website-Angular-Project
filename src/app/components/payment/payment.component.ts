import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _HttpClient: HttpClient,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder,
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  id: any;
  ngOnInit(): void {
    this.id =this._ActivatedRoute.snapshot.paramMap.get('id');
  }

  checkForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city:['']
  })

  

  onSubmit(){
    const orderDetials = this.checkForm.value;
    this._CartService.checkOut(this.id,orderDetials).subscribe({
      next: (res) => {
        window.open(res.session.url);
      },
      error: (err) => {
        ///this._ToastrService.error(err.error.message);
        this._ToastrService.error("Cart is Empty",' ' ,{ timeOut: 1000 });
      },
    })
  }

}
