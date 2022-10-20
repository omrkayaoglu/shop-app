import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  private title = 'Home Page';

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  getTitle() {
    return this.title;
  }

  createProduct() {

    const product = { 
      id: 1, 
      name: "iphone 19", 
      price: 20000, 
      imageUrl: "3.jpeg", 
      description: "iyi telefon", 
      isActive: true, 
      categoryId: 2 
    }

    this.productService.createProduct(product).subscribe(data => console.log(data));

  }
}
