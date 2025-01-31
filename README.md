onSave() {
  if (this.productForm.invalid) {
    this.isFormSubmitted = true;
    return;
  }

  const oldData = localStorage.getItem("ProductData");
  let productData = oldData ? JSON.parse(oldData) : [];

  const newProduct = { ...this.productForm.value };
  newProduct.id = productData.length ? productData[productData.length - 1].id + 1 : 1;

  productData.unshift(newProduct);
  localStorage.setItem("ProductData", JSON.stringify(productData));

  this.router.navigate(['/display']);
  alert("Data inserted successfully!");
}

onUpdate() {
  const oldData = localStorage.getItem("ProductData");
  if (!oldData) return;

  let productData = JSON.parse(oldData);
  const index = productData.findIndex((p: any) => p.id === this.productForm.controls['id'].value);

  if (index !== -1) {
    productData[index] = { ...this.productForm.value };
    localStorage.setItem("ProductData", JSON.stringify(productData));

    alert("Data updated successfully!");
    this.router.navigate(['/display']);
  } else {
    alert("Product not found!");
  }
}



