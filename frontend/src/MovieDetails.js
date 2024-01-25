import React from 'react';

const MovieDetails = ({ details }) => {
    return (
        <div>
            <h2>{details.Title}</h2>
            <img src={details.Poster} alt={details.Title} />
            <p>{details.Plot}</p>
            <p>IMDB Score: {details.imdbRating}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default MovieDetails;