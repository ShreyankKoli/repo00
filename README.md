removeFromCart(product: Product) {
    const index = this.items.findIndex((item) => item.id === product.id);
    console.log(index, "index");

    if (index !== -1) {
        this.items.splice(index, 1); // Remove item from cart

        // Count how many times this product is still in the cart
        const itemsInCart = this.items.filter(item => item.id === product.id).length;

        // Ensure stock never exceeds its original count
        if (product.stock < (itemsInCart + 1)) {
            product.stock++;
        }

        this.totalPrice -= product.price;
        console.warn(this.totalPrice, "DecreasePrice");
    }
}

  


