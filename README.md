import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(parseInt(productId, 10));
    }
  }

  fetchProduct(id: number) {
    const localData = localStorage.getItem('products');
    if (localData) {
      const products: Product[] = JSON.parse(localData);
      this.product = products.find(product => product.id === id) || null;
    }
  }
}


