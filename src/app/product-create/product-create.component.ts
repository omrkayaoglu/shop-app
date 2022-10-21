import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
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
