import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlanklayoutComponent } from './layouts/blanklayout/blanklayout.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { ProductsComponent } from './components/products/products.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: BlanklayoutComponent,
    children: [
      { path: '', redirectTo: 'Home', pathMatch: 'full' }

      //lazy loading
      //,{path:'setting' ,loadChildren:()=>import('./setting/setting.module').then(m=>m.SettingModule)}

      ,{
        path: 'Home',
        canActivate: [authGuard],
        component: HomeComponent,
        title: 'Home',
      },
      {path:'wishlist' ,component:WishlistComponent ,canActivate:[authGuard] ,title:'Wish list'}
      ,{
        path: 'Products',
        canActivate: [authGuard],
        component: ProductsComponent,
        title: 'Products',
      },
      {
        path: 'allorders',
        canActivate: [authGuard],
        component: AllordersComponent,
        title: 'All Orders',
      },
      {
        path: 'payment/:id',
        canActivate: [authGuard],
        component: PaymentComponent,
        title: 'Payment',
      },
      {
        path: 'Details/:id',
        canActivate: [authGuard],
        component: ProductDetailsComponent,
        title: 'Products Details',
      },
      {
        path: 'Cart',
        canActivate: [authGuard],
        component: CartComponent,
        title: 'Cart',
      },
      {
        path: 'Categories',
        canActivate: [authGuard],
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'Brands',
        canActivate: [authGuard],
        component: BrandsComponent,
        title: 'Brands',
      },
    ],
  },
  
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      { path: 'Register', component: RegisterComponent, title: 'Register' },
      { path: 'Login', component: LoginComponent, title: 'Login' },
      { path: 'Password-reset', component: ForgetPasswordComponent, title: 'Reset Password' },

    ],
  },
  
  { path: '**', component: NotfoundComponent, title: 'Not Found' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
