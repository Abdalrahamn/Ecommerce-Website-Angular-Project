import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarAuthComponent } from './components/navbar-auth/navbar-auth.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';
import { ProductsComponent } from './components/products/products.component';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CuttextPipe } from './cuttext.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './components/payment/payment.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SearchPipe } from './search.pipe';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    NavbarAuthComponent,
    NavbarBlankComponent,
    CartComponent,
    BrandsComponent,
    CategoriesComponent,
    RegisterComponent,
    LoginComponent,
    AuthlayoutComponent,
    BlanklayoutComponent,
    ProductsComponent,
    CuttextPipe,
    ProductDetailsComponent,
    PaymentComponent,
    LoaderComponent,
    AllordersComponent,
    WishlistComponent,
    SearchPipe,
    NotfoundComponent,
    ForgetPasswordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      //progressBar: true,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
