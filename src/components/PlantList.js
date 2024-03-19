import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onUpdatedPlantPriceClick }) {

  // Map over the plants and create a PlantCard component for each one
  const plantCards = plants.map((plant) => {
    return <PlantCard key={plant.id} plant={plant} onDeletePlant={onDeletePlant} onUpdatedPlantPriceClick={onUpdatedPlantPriceClick} />;
  })

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
