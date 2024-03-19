import React from "react";

function Search({ search, onHandleSearch }) {

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => onHandleSearch(e)}
      />
    </div>
  );
}

export default Search;
