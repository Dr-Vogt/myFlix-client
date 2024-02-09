import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://testingmovieapi.onrender.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.docs.map((doc) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    Description: movie.Description,
                    Genre: {
                    Name: movie.Genre.Name
            },
                    Director: {
                    Name: movie.Director.Name
            }
                }
               
            })
        })
    })

    if (selectedMovie) {
        return (
            <MovieView
             movieData={selectedMovie}
             onBackClick={() => setSelectedMovie(null)}
            /> 
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                 key={movie.id}
                 movieData={movie}
                 onMovieClick={() => {
                    setSelectedMovie(movie);
                 }}
                /> 
            ))}
        </div>
    );
};
