import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"
 
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [token, setToken] = useState(storedToken? storedToken : null);

    const [user, setUser] = useState(storedUser? storedUser : null);


    useEffect(() => {
        if (!token) {
            return;
       }
        fetch("https://testingmovieapi.onrender.com/movies", {
            headers: {Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            setMovies(data);
                });
               
            }, [] );
        

    if (selectedMovie) {
        return (
            <MovieView
             movieData={selectedMovie}
             onBackClick={() => setSelectedMovie(null)}
            /> 
        );
    }

    if (!user) {
        return (
            <>
            <LoginView
                onLoggedIn={(user, token) => {
                   setUser(user);
                    setToken(token);
                }} />
            or

            <SignupView />
            </>      
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
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );

};