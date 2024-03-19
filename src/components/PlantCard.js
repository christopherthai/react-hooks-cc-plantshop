import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant }) {

  const { id, name, image, price } = plant; // Destructure the plant object
  const [inStock, setInStock] = useState(true); // Set the inStock state to true

  // Update the inStock state when the button is clicked
  const handleInStockClick = () => {
    setInStock(prev => !prev);
  }

  // Delete the plant from the server
  const handleDeleteClick = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Will be called if the server returns a success
        } else {
          console.error("Error deleting plant"); // Will be called if the server returns an error
        }
      })
      .then(() => {
        onDeletePlant(id);
      })
      .catch((error) => {
        console.error("Error deleting plant", error); // Will be called if the fetch fails
      });
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button onClick={handleInStockClick} className="primary">In Stock</button>
      ) : (
        <button onClick={handleInStockClick}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
