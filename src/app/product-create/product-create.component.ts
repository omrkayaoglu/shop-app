import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  saveProduct(name:any,price:any,imageUrl:any,description:any,isActive:any,categoryId:any) {

    const product = { 
      id: 1, 
      name: name.value, 
      price: price.value, 
      imageUrl: imageUrl.value, 
      description: description.value, 
      isActive: isActive.checked, 
      categoryId: categoryId.value
    }

    this.productService.createProduct(product).subscribe(data => {
      this.router.navigate(['/products']);
    });

  }

}
