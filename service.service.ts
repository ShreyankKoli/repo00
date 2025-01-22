import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsKey = 'products';
  private cartKey = 'cart';

  // Get products from localStorage
  getProducts() {
    const data = localStorage.getItem(this.productsKey);
    return data ? JSON.parse(data) : [];
  }

  // Set the current product for editing
  setCurrentProduct(product: any) {
    localStorage.setItem('currentProduct', JSON.stringify(product));
  }

  // Delete a product by ID
  deleteProduct(productId: number) {
    const products = this.getProducts().filter((p: any) => p.id !== productId);
    localStorage.setItem(this.productsKey, JSON.stringify(products));
  }

  // Add product to the cart
  addToCart(product: any) {
    let cart = this.getCart();
    const existingProduct = cart.find((p: any) => p.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  // Get cart data from localStorage
  getCart() {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  // Remove product from cart
  removeFromCart(productId: number) {
    let cart = this.getCart();
    cart = cart.filter((p: any) => p.id !== productId);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
}
