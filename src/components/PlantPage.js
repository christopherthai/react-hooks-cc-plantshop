import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
import UpdatePlantPrice from "./UpdatePlantPrice";

function PlantPage() {

  const [plants, setPlants] = useState([]); // Set the plants state to an empty array
  const [search, setSearch] = useState(""); // Set the search state to an empty string
  const [selectedPlant, setSelectedPlant] = useState({}); // Set the selectedPlant state to an empty object

  // Fetch the plants from the server
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => {
        if (response.ok) {
          return response.json(); // Will be called if the server returns a success
        } else {
          console.error("Error fetching plants"); // Will be called if the server returns an error
        }
      })
      .then((plantsData) => {
        setPlants(plantsData);
      })
      .catch((error) => {
        console.error("Error fetching plants", error); // Will be called if the fetch fails
      });
  }, []);

  // Save the selected plant to the selectedPlant state when the user clicks the "Update Price" button
  const handleUpdatePlantPriceClick = (plant) => {
    setSelectedPlant(plant);
  }

  // Save the change to the plant price from the price input field from the UpdatePlantPrice component to the selectedPlant state
  const handleUpdatedPlantPrice = (name, value) => {
    setSelectedPlant({
      ...selectedPlant,
      [name]: value,
    });
  }

  // Update the price of the selected plant on the page after clicking the "Update Plant Price" button
  const handleUpdatePlantPriceOnPage = (updatedPlant) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlants);
  }

  // Delete a plant from the list
  const handleDeletePlant = (id) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  }

  // Add a new plant to the list
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  }

  // Update the search term in the search state
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // Filter the plants based on the search term
  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <UpdatePlantPrice selectedPlant={selectedPlant} onUpdatedPlantPrice={handleUpdatedPlantPrice} onUpdatePlantPriceOnPage={handleUpdatePlantPriceOnPage} />
      <Search search={search} onHandleSearch={handleSearch} />
      <PlantList plants={filteredPlants} onDeletePlant={handleDeletePlant} onUpdatePlantPriceClick={handleUpdatePlantPriceClick} />
    </main>
  );
}

export default PlantPage;
