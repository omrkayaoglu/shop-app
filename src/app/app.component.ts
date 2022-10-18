import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Home Page';

  constructor(private http: HttpClient) { }

  getTitle() {
    return this.title;
  }

  createProduct() {

    const product = { 
      id: 1, 
      name: "iphone 22", 
      price: 20000, 
      imageUrl: "3.jpeg", 
      description: "iyi telefon", 
      isActive: true, 
      categoryId: 1 
    }

    this.http.post('<api_adresiniz>', product)
      .subscribe(data => console.log(data));

  }
}
