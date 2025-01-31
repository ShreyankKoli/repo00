onSave() {
  if (this.productForm.invalid) {
    this.isFormSubmitted = true;
    return;
  }

  // Retrieve existing data from localStorage
  const oldData = localStorage.getItem("ProductData");
  let productList = oldData ? JSON.parse(oldData) : [];

  // Assign a unique ID (incremental)
  const newId = productList.length > 0 ? productList[productList.length - 1].id + 1 : 1;
  this.productForm.controls['id'].setValue(newId);

  // Add new product to the list
  productList.unshift(this.productForm.value);

  // Save updated data to localStorage
  localStorage.setItem('ProductData', JSON.stringify(productList));

  // Update the local list in the component
  this.productList = productList;

  // Navigate to display page
  this.router.navigate(['/display']);
  alert("Data inserted successfully");
}

onUpdate() {
  const oldData = localStorage.getItem("ProductData");
  let productList = oldData ? JSON.parse(oldData) : [];

  // Find the existing record by ID
  const recordIndex = productList.findIndex(m => m.id === this.productForm.controls['id'].value);

  if (recordIndex !== -1) {
    // Update the existing record
    productList[recordIndex] = { ...this.productForm.value };

    // Save updated data to localStorage
    localStorage.setItem('ProductData', JSON.stringify(productList));

    // Update the local list in the component
    this.productList = productList;

    alert("Data Updated Successfully");
    this.router.navigate(['/display']);
  } else {
    alert("Error: Record not found");
  }
}


