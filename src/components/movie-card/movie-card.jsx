import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movieData,  }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.favoriteMovies &&
      user.favoriteMovies.includes(movieData._id)
    ) {
      setIsFavorite(true);
    }
  }, [movieData._id]);

  console.log(user);

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
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          
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
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
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
          <Button className="fav-btn" onClick={addFavoriteMovie}>
            Add Fav
          </Button>
          <span style={{ marginLeft: '10px' }}></span>
          <Button className="fav-btn" onClick={removeFavoriteMovie}>
            Remove Fav
          </Button>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }),
  
  setUser: PropTypes.func.isRequired,
};
