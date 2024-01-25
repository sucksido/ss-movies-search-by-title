import React, { useState } from 'react';

const MovieSearch = ({ searchMovies }) => {
    const [title, setTitle] = useState('');

    const handleSearch = () => {
        searchMovies(title);
    };

    return (
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default MovieSearch;