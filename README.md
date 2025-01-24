import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'], // Fixed typo here
})
export class DisplayComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'image', 'price', 'actions'];
  dataSource: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const localData = localStorage.getItem('products');
    if (localData) {
      this.dataSource = JSON.parse(localData);
    } else {
      this.http.get<{ products: Product[] }>('https://dummyjson.com/products') // Corrected "products" property
        .subscribe(response => {
          this.dataSource = response.products.map(({ id, title, description, image, price }) => ({ id, title, description, image, price }));
          localStorage.setItem('products', JSON.stringify(this.dataSource));
        });
    }
  }

  editProduct(product: Product) {
    const updatedTitle = prompt('Edit Title', product.title);
    if (updatedTitle !== null) {
      product.title = updatedTitle;
      localStorage.setItem('products', JSON.stringify(this.dataSource));
    }
  }

  deleteProduct(id: number) {
    this.dataSource = this.dataSource.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(this.dataSource));
  }
}

