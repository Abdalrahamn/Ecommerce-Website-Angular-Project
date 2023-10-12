import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  productId: any = '';
  productData: any = {};
  wishListedItems:string[] = [];

  ngOnInit(): void {

    this._WishlistService.getAllWishlist().subscribe({
      next: (res) => {
        /* for(let product of res.data) {
          this.wishListedItems.push(product._id);
        } */
        for (let i = 0; i < res.data.length; i++) {
          this.wishListedItems.push(res.data[i]._id);
        }
      }
    });

    const id = this._ActivatedRoute.snapshot.paramMap.get('id');
    this.productId = id;

    this._ApiDataService.getProductById(this.productId).subscribe({
      next: (data) => {
        
        this.productData = data.data;
      },
    });
  }

  productSlide: OwlOptions = {
    loop: true,
    autoplaySpeed: 2000,
    smartSpeed: 1000,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
        this._ToastrService.success(res.message,' ' ,{ timeOut: 700 });
      },
    });
  }


  addToWishList(prodid:string , addColor:HTMLElement){
    this._WishlistService.addToWish(prodid).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message,' ' ,{ timeOut: 800 });
        //addColor.style.color = 'Green';
        this.wishListedItems = res.data;
      },
      error:(err)=>{
        
      }
    })
  }

  deleteFromWishList(id:string, heartIcon:HTMLElement) {
    this._WishlistService.deleteFromWish(id).subscribe({
      next: (res) => {
        heartIcon.style.color = '';
        this.wishListedItems = res.data;
        this._ToastrService.success(res.message, "" , { timeOut: 800 }); 
      }
    });
  }

}
