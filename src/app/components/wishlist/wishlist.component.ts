import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService: WishlistService , private _ToastrService:ToastrService) {}

  loading: boolean = true;
  wishListedItems:any[] = []

  ngOnInit(): void {
    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        this.loading = false;
        this.wishListedItems = res.data;
      },
      error: (err) => {
      },
    });
  }

  deleteFromWish(prodId: string) {
    this._WishlistService.deleteFromWish(prodId).subscribe({
      next: (res) => {
        this.ngOnInit();
        this._ToastrService.success('Item Removed From Wishlist');

      },
      error: (err) => {
        
      },
    });
  }
}
