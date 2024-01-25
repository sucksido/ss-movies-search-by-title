import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch recent searches from local storage or API
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const apiKey = 'befaa6a3';
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

      const response = await axios.get(apiUrl);
      setSearchResults(response.data.Search || []);

      // Save the search term to recent searches
      const updatedSearches = [...recentSearches, searchTerm].slice(-5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = async (imdbID) => {
    try {
      setLoading(true);
      const apiKey = 'befaa6a3';
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

      const response = await axios.get(apiUrl);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#28a745', padding: '20px', borderRadius: '10px' }}>
      <h1 className="text-white">Movie Search App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-light" type="button" onClick={handleSearch} disabled={loading}>
            Search
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h2 className="text-white">Search Results</h2>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <ul className="list-group">
              {searchResults.map((movie) => (
                <li key={movie.imdbID} className="list-group-item">
                  {movie.Title} - {movie.Year}{' '}
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleSelectMovie(movie.imdbID)}
                  >
                    Click here for Details
                  </button>

                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedMovie && (
          <div className="col-md-6">
            <h2 className="text-white">{selectedMovie.Title}</h2>
            <img src={selectedMovie.Poster} alt={`${selectedMovie.Title} Poster`} className="img-fluid mb-3" />
            {/* Add other details as needed */}
            <p className="text-white">Year: {selectedMovie.Year}</p>
            <p className="text-white">Rated: {selectedMovie.Rated}</p>
            <p className="text-white">Released: {selectedMovie.Released}</p>
            <p className="text-white">Plot: {selectedMovie.Plot}</p>
            <p className="text-white">Language: {selectedMovie.Language}</p>
            <p className="text-white">Country: {selectedMovie.Country}</p>
            {/* Add sections for Ratings, Metascore, etc. */}
            <h3 className="text-white">Ratings</h3>
            <ul className="list-group">
              {selectedMovie.Ratings.map((rating, index) => (
                <li key={index} className="list-group-item">
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
            {/* Add other details as needed */}
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-white">Recent Searches</h2>
        <ul className="list-group">
          {recentSearches.map((search, index) => (
            <li key={index} className="list-group-item">
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
