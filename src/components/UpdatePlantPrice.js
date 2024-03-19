import React from 'react'

function UpdatePlantPrice({ selectedPlant, onUpdatedPlantPrice, onUpdatePlantPriceOnPage }) {

  const { id, name, image, price } = selectedPlant; // Destructure the selected plant

  // Handle the change event on the price input field and pass the price value to the PlantPage component
  const handleChange = (e) => {
    onUpdatedPlantPrice(e.target.name, e.target.value);
  }

  // Update the price of a plant on the server and return the updated plant
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: price }), // Send the updated price to the server
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Will be called if the server returns a success
        } else {
          console.error("Error updating plant price"); // Will be called if the server returns an error
        }
      })
      .then((updatedPlant) => {
        onUpdatePlantPriceOnPage(updatedPlant);
      })
      .catch((error) => {
        console.error("Error updating plant price", error); // Will be called if the fetch fails
      });
  }

  return (
    <div onSubmit={handleSubmit} className="new-plant-form">
      <h2>Update Plant Price</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={handleChange}
        />
        <button type="submit">Update Plant Price</button>
      </form>
    </div>
  );
}

export default UpdatePlantPrice
