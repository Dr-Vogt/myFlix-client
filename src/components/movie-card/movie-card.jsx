import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movieData, }) => {
  const token = localStorage.getItem("token");
  
 
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const updateUserFavorites = (updatedFavorites) => {
    const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.FavoriteMovies && storedUser.FavoriteMovies.includes(movieData._id)) {
        setIsFavorite(true);
      }
    } else {
      // If user is not in local storage, fetch user data from the server
      fetchUserData(`https://testingmovieapi.onrender.com/users/${user.Username}/movies/${movieData._id}`,
      { method: "PUT", headers: { Authorization: `Bearer ${token}` } });
    
    }
  }, [movieData._id]);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieData._id);
      setIsFavorite(isFavorite);
    }
  }, [user, movieData._id]);

  console.log("Final isFavorite in MovieCard:", isFavorite);


  const addFavoriteMovie = () => {
    fetch(
      `https://testingmovieapi.onrender.com/users/${user.Username}/movies/${movieData._id}`,
      { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });

     
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://testingmovieapi.onrender.com/users/${user.Username}/movies/${movieData._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateLocalStorage = ( movie_id, isFavorite) => {
    if (!user || !user.Username) return;
    let updatedUser = JSON.parse(localStorage.getItem("user"));
    if (!updatedUser) return;

    if (isFavorite) {
      if (!updatedUser.FavoriteMovies.includes(movie_id)) {
        updatedUser.FavoriteMovies.push(movie_id);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } else {
      updatedUser.FavoriteMovies = updatedUser.FavoriteMovies.filter(id => id !== movie_id);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <Card className="h-100" class="Card">
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body class="Card">
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
        <Card.Text>{movieData.Genre.Name}</Card.Text>
        <Card.Text>{movieData.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
          <Button className="open-button" variant="link" style={{ marginLeft: '16px' }}>Open</Button>
        </Link>
        <Card.Body className="favorite-btns">
        {user && ( 
          isFavorite ? (
            <Button className="fav-btn" onClick={removeFavoriteMovie}>
              Remove Fav
            </Button>
          ) : (
            <Button className="fav-btn" onClick={addFavoriteMovie}>
              Add Fav
            </Button>
          )
        )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }),
  
  user: PropTypes.object.isRequired,
};
