import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
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
                }).catch(e => {
                    console.log(e)
                });
               
            }, [token] );
        
    return (
        <Row className="justify-content-md-center">
            {!user ? (
            <Col md={5} style={{ border: "1px solid black"}}>
            <LoginView
                onLoggedIn={(user, token) => {
                   setUser(user);
                    setToken(token);
                }} />
            or

            <SignupView />
            </Col>      
        ) : selectedMovie ? (
           <Col md={8}> 
            <MovieView
                
             movieData={selectedMovie}
             onBackClick={() => setSelectedMovie(null)}
            /> 
           </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (    
           <> 
            {movies.map((movie) => (
               <Col className="mb-5" key={movie.id} md={3}> 
                <MovieCard
                 movieData={movie}
                 onMovieClick={() => {
                    setSelectedMovie(movie);
                 }}
                /> 
               </Col> 
            ))}
            </>
        )}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </Row>
    );
};