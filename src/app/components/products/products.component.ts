import { Component, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product, CategoriesInterface } from 'src/app/data';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  loading: boolean = true;
  constructor(
    private _ApiDataService: ApiDataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService:WishlistService,
    private _Renderer2:Renderer2
  ) {}

    //wishListedItems:any[] = [];
    wishListedItems:string[] = [];
    ProductData: Product[] = [];
    CategoriesData: CategoriesInterface[] = [];
    searchts:string = '';

    ngOnInit(): void {

      this._WishlistService.getAllWishlist().subscribe({
        next: (res) => {
          for(let product of res.data) {
            this.wishListedItems.push(product._id);
          }
        }
      });
  
  
      this._ApiDataService.getProducts().subscribe({
        next: (res) => {
          this.ProductData = res.data;
          
        },
      });
  
      this._ApiDataService.getCategories().subscribe({
        next: (res) => {
          this.CategoriesData = res.data;
          this.loading = false;
        },
      });
    }
  
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
          addColor.style.color = 'Green';
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
          this._ToastrService.success(res.message, "Wish List" , { timeOut: 800 }); 
        }
      });
    }
  

}
