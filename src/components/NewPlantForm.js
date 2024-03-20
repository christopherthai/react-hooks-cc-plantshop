import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {

  // Set the initial form state
  const initialForm = {
    name: "",
    image: "",
    price: "",
  };

  // Set the form state to the initial form
  const [formData, setFormData] = useState(initialForm);

  // Update the form state when the input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Add a new plant to the server
  const handleSubmit = (e) => {
    e.preventDefault();

    const plantData = {
      ...formData,
      price: parseFloat(formData.price) // Convert price from a string to a number
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plantData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Will be called if the server returns a success
        } else {
          console.error("Error fetching plants"); // Will be called if the server returns an error
        }
      })
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData(initialForm);
      })
      .catch((error) => {
        console.error("Error adding plant", error); // Will be called if the fetch fails
      });
  }


  return (
    <div onSubmit={handleSubmit} className="new-plant-form">
      <h2>New Plant</h2>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price" step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
