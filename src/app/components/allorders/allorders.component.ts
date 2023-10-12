import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit {

  id: any;
  allOrders :any[] = [];
  loading: boolean = true;

  constructor(
    private _CartService: CartService,
  ) {}
  ngOnInit(): void {
    this.id = localStorage.getItem('CartOwner');

    this._CartService.getAllOrders(this.id).subscribe({
      next: (res) => {
        this.allOrders = res;
        this.loading = false;
      },
    });
  }
}
