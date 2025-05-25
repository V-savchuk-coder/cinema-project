import React, { useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
    const [search, setSearch] = useState("");
    // Фільтрація фільмів за назвою
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <div className="movie-list">
                {filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;