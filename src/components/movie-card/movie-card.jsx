import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movieData,  }) => {
  const token = localStorage.getItem("token");
 
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);
  const updateUserFavorites = (updatedFavorites) => {
    const updatedUser = { ...user, favoriteMovies: updatedFavorites };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
    setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    console.log("user in MovieCard:", user);
    console.log("movieData in MovieCard:", movieData);
    console.log("isFavorite in MovieCard:", isFavorite);

    if (user && user.favoriteMovies && user.favoriteMovies.includes(movieData._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movieData._id, user]);

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

  const updateLocalStorage = ( movieId, isFavorite) => {
    if (!user || !user.Username) return;
    let updatedUser = JSON.parse(localStorage.getItem("user"));
    if (!updatedUser) return;

    if (isFavorite) {
      if (!updatedUser.favoriteMovies.includes(movieId)) {
        updatedUser.favoriteMovies.push(movieId);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } else {
      updatedUser.favoriteMovies = updatedUser.favoriteMovies.filter(id => id !== movieId);
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
