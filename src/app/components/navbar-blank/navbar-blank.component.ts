import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/services/api-data.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss'],
})
export class NavbarBlankComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _CartService:CartService
  ) {}

  countCartItems: number = 0;

  ngOnInit(): void {
    // Need to Behavier Subject
    this._CartService.cartNumber.subscribe({
      next: (res) => {
        this.countCartItems = res;
      },
    });

    //when i refresh the page
    this._CartService.getFromCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
    });
  }
  SignOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/Login']);
  }


}
