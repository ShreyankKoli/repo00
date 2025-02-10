.popup {
  position: absolute;
  top: 110%; /* Adjust based on your layout */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

export class YourComponent {
  clickedId: number | null = null; // Ensure clickedId is of type number

  onImageClick(id: number) {
    this.clickedId = this.clickedId === id ? null : id; // Toggle popup
  }

  closePopup(event: Event) {
    event.stopPropagation(); // Prevent click from closing the popup immediately
    this.clickedId = null;
  }
}

