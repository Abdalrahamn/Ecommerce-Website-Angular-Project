import { Component } from '@angular/core';
import { CategoriesInterface } from 'src/app/data';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  constructor(private _ApiDataService:ApiDataService) { }

  loading: boolean = true;
  allBrands: any[] = [];

  ngOnInit(): void {
    this._ApiDataService.getAllBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;

      }
    });
  }
}
