import { Component, OnInit } from '@angular/core';
import { CategoriesInterface } from 'src/app/data';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  implements OnInit{
  constructor(private _ApiDataService:ApiDataService) { }

  loading: boolean = true;
  CategoriesData: CategoriesInterface[] = [];

  ngOnInit(): void {
    this._ApiDataService.getCategories().subscribe({
      next: (res) => {
        this.CategoriesData = res.data;
        this.loading = false;
      },
    });
  }

}
