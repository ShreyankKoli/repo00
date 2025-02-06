addToCart(product: Product) {
  if (product.stock > 0) {
    product.stock--;
    product.price += product.price; // Modify this based on your pricing logic
  }
}

removeFromCart(product: Product) {
  product.stock++;
  product.price -= product.price; // Modify based on your pricing logic
}

<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
  <!-- Other table columns -->

  <ng-container matColumnDef="stock">
    <th mat-header-cell *matHeaderCellDef> Stock </th>
    <td mat-cell *matCellDef="let product">{{ product.stock }}</td>
  </ng-container>

  <ng-container matColumnDef="price">
    <th mat-header-cell *matHeaderCellDef> Price </th>
    <td mat-cell *matCellDef="let product">{{ product.price | currency }}</td>
  </ng-container>

  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef> Actions </th>
    <td mat-cell *matCellDef="let product">
      <button mat-button color="primary" (click)="addToCart(product)">Add to Cart</button>
      <button mat-button color="warn" (click)="removeFromCart(product)" [disabled]="product.stock <= 0">Remove</button>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>


