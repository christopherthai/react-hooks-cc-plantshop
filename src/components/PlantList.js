import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onUpdatePlantPriceClick }) {

  // Map over the plants and create a PlantCard component for each one
  const plantCards = plants.map((plant) => {
    return <PlantCard key={plant.id} plant={plant} onDeletePlant={onDeletePlant} onUpdatePlantPriceClick={onUpdatePlantPriceClick} />;
  })

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
