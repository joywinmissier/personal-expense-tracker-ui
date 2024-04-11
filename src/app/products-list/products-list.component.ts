import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  show = true;

  products: any[] = []
  category = 'Electronics';

  constructor(){
    setTimeout(()=>{
      this.products = [{
        name : 'Product 1',
        id : 1,
        price: 100
      },
    {
        name : 'Product 2',
        id : 2,
        price: 200
      },
    {
        name : 'Product 3',
        id : 3,
        price: 300
      },
    {
        name : 'Product 4',
        id : 4,
        price: 400
    }]
    }, 5000)
  }

}
