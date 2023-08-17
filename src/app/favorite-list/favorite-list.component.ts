import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  products: Product[] = [];

  loading: boolean = false;
  isFavorite: boolean = false;
  favorites: Product[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  addFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favorites.push(this.products[0]);
      console.log(this.favorites)
      console.log("Favoriye eklendi")
      return;
    }
      console.log(this.favorites)
      console.log("Favoriden çıkarıldı")
  }
}
