import React from 'react';

const MovieResults = ({ results, selectMovie }) => {
    return (
        <ul>
            {results.map((movie) => (
                <li key={movie.imdbID} onClick={() => selectMovie(movie.imdbID)}>
                    {movie.Title} ({movie.Year})
                </li>
            ))}
        </ul>
    );
};

export default MovieResults;