import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
 
export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [movies, setMovies] = useState([]);

    const params = useParams();

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
        <BrowserRouter>

            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                    path="/signup"
                    element={
                        <>
                        {user ? (
                            <navigate to="/" />
                        ) : (
                          <Col md={5}>
                            <SignupView />
                          </Col>    
                        )}
                        </>
                    }
                    />
                    <Route
                    path="/login"
                    element={
                        <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token); 
                                }} />
                            </Col>       
                        )}
                        </>
                    }
                    />
                    <Route
                    path="movies/:Title"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col> The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movieData={movies} />
                                </Col>
                            )}
                        </>    
                    } 
                    />
                    <Route
                    path="/"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                            <Col> The list is empty!</Col>
                        ) : (
                          <>
                            {movies.map((movies) => (
                                <Col className="mb-4" key={movies.id} md={3}>
                                    <MovieCard movieData={movies} />
                                </Col>
                            ))}
                          </>    
                        )}
                        </>
                    }
                    />
            </Routes>
        </Row>
    </BrowserRouter>
    );
};