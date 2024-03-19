import React from "react";

function Search({ search, onHandleSearch }) {

  // Handle the change event on the search input field and pass the search value to the PlantPage component
  const handleChange = (e) => {
    onHandleSearch(e);
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default Search;
