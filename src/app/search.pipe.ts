import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], item:string): any[]{
    return products.filter((x)=> x.title.toLowerCase().includes(item.toLowerCase()));
  }

}
