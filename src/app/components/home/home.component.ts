import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiDataService } from './../../services/api-data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesInterface, Product } from 'src/app/data';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  loading: boolean = true;
  searchts:string = ''; 

  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2
  ) {}


  green: boolean = false;
  //wishListedItems:any[] = [];
  wishListedItems:string[] = [];
  ProductData: Product[] = [];
  CategoriesData: CategoriesInterface[] = [];

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


    this._ApiDataService.getProducts().subscribe({
      next: (res) => {
        this.ProductData = res.data;
        this.loading = false;
      },
    });

    this._ApiDataService.getCategories().subscribe({
      next: (res) => {
        this.CategoriesData = res.data;
      },
    });
  }

  CategorieSlide: OwlOptions = {
    loop: true,
    autoplaySpeed: 2000,
    smartSpeed: 1000,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  mainSlide: OwlOptions = {
    loop: true,
    autoplaySpeed: 2000,
    smartSpeed: 1000,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  //when i add to cart
  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message,' ' ,{ timeOut: 700 });
        this._CartService.cartNumber.next(res.numOfCartItems);
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
