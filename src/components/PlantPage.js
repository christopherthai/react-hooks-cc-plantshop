import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plants, setPlants] = useState([]); // Set the plants state to an empty array
  const [search, setSearch] = useState(""); // Set the search state to an empty string

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

  // Delete a plant from the list
  const handleDeletePlant = (id) => {
    const updatedPlants = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlants);
  }

  // Add a new plant to the list
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  }

  // Update the search term
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  // Filter the plants based on the search term
  const filteredPlants = plants.filter((plant) => plant.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onHandleSearch={handleSearch} />
      <PlantList plants={filteredPlants} onDeletePlant={handleDeletePlant} />
    </main>
  );
}

export default PlantPage;
