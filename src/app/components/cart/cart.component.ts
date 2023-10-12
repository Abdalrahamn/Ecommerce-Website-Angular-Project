import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  loading: boolean = true;
  constructor(
    private _HttpClient: HttpClient,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  cartData: any = {};
  ngOnInit(): void {
    this._CartService.getFromCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.loading = false;
        
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }

  removeFromCart(id: string): void {
    this._CartService.deleteFromCart(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
        
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success("Removed Successfully",' ' ,{ timeOut: 700 });
      },
    });
  }

/*   clearfromCart(totalCartPrice: undefined): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        totalCartPrice = undefined;
        this.cartData = res.data;
        this._ToastrService.success(" Deleted cart Successfully",' ' ,{ timeOut: 700 });
      },
    });
  }
 */
  clearfromCart(totalCartPrice: undefined | number): void {
    if (totalCartPrice !== undefined) {
      this._CartService.clearCart().subscribe({
        next: (res) => {
          totalCartPrice = undefined;
          this.cartData = res.data;
          this._CartService.cartNumber.next(res.numOfCartItems);
          this._ToastrService.success(" Deleted cart Successfully", '', { timeOut: 700 });
          window.location.reload();
        },
      });
    }
  }

  updateCart(count: number,id: string): void {
    this._CartService.updateCart(id, count).subscribe({
      next: (res) => {
        if (count == 0) {
          this.removeFromCart(id);
        }
        else{
          this.cartData = res.data;
          this._ToastrService.success("Updated Successfully",' ' ,{ timeOut: 700 });
        }
      },
    });
  }


}
