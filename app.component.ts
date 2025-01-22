import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from './product.service'; // Service to handle data and cart

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'price', 'stock', 'action'];
  fullColumns: string[] = ['id', 'title', 'images', 'description', 'price', 'stock', 'action'];
  showLimitedColumns = true;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    const cachedData = localStorage.getItem('products');
    if (cachedData) {
      const products = JSON.parse(cachedData);
      this.loadProducts(products);
    } else {
      this.fetchData();
    }
  }

  loadProducts(products: any[]) {
    // Load products into MatTableDataSource
    this.dataSource = this.productService.getProducts();
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData() {
    this.http.get<any>('https://dummyjson.com/products').subscribe(response => {
      const products = response.products;
      this.loadProducts(products);
      localStorage.setItem('products', JSON.stringify(products));
    });
  }

  filterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnDisplay(event: any) {
    this.showLimitedColumns = event.checked;
    this.displayedColumns = this.showLimitedColumns 
      ? ['id', 'title', 'price', 'stock', 'action'] 
      : this.fullColumns;
  }

  editProduct(product: any) {
    this.productService.setCurrentProduct(product);
    this.router.navigate(['/add-product']);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    const updatedProducts = this.productService.getProducts();
    this.loadProducts(updatedProducts);
  }

  addToCart(product: any) {
    if (product.stock > 0) {
      this.productService.addToCart(product);
      product.stock -= 1; // Update stock dynamically
      localStorage.setItem('products', JSON.stringify(this.dataSource.data));
    }
  }
}
