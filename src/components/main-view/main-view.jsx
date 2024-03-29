import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);

  const params = useParams();

  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://testingmovieapi.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [token]);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const handleSearchInput = (e) => {
    const searchWord = e.target.value.toLowerCase();
    let tempArray = movies.filter(
      (movie) =>
        movie.Title.toLowerCase().includes(searchWord) ||
        (movie.Genre && movie.Genre.Name.toLowerCase().includes(searchWord)) ||
        (movie.Director &&
          movie.Director.Name.toLowerCase().includes(searchWord))
    );
    setFilteredMovies(tempArray);
    
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
        handleSearchInput={handleSearchInput}
      />
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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
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
                    {filteredMovies.map((movies) => (
                      <Col className="mb-3" key={movies.id} md={3} style={{ padding: '20px' }}>
                        <MovieCard movieData={movies} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
