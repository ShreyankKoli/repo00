import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface Product {
  title: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'price', 'stock', 'images', 'action'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>([]);
  productList: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('ProductData');
    if (storedData) {
      this.productList = JSON.parse(storedData);
      this.dataSource.data = this.productList;
    } else {
      this.fetchProducts();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchProducts(): void {
    this.http.get<{ products: Product[] }>('https://dummyjson.com/products').subscribe((response) => {
      this.productList = response.products.map((product) => ({
        title: product.title,
        description: product.description,
        images: product.images,
        price: product.price,
        stock: product.stock,
      }));

      localStorage.setItem('ProductData', JSON.stringify(this.productList));
      this.dataSource.data = this.productList;
    });
  }

  onDelete(index: number): void {
    if (confirm('Do you want to delete this product?')) {
      this.productList.splice(index, 1);
      localStorage.setItem('ProductData', JSON.stringify(this.productList));
      this.dataSource.data = this.productList;
    }
  }
}


