import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  product: any = { title: '', description: '', price: 0, stock: 0 };
  isEdit = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.currentProduct$.subscribe(product => {
      if (product) {
        this.product = { ...product };
        this.isEdit = true;
      }
    });
  }

  saveProduct() {
    if (this.isEdit) {
      this.productService.updateProduct(this.product);
    } else {
      this.productService.saveProduct(this.product);
    }
    this.router.navigate(['/products']);
  }
}
