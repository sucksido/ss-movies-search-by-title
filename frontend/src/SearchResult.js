// SearchResult.js

import React from 'react';

function SearchResult({ onMovieSelect }) {
  // Implement logic to fetch and display search results

  // Example:
  const searchResults = []; // Placeholder for search results

  // Your implementation here

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.ImdbId} onClick={() => onMovieSelect(movie)}>
            {movie.Title} - {movie.Year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResult;