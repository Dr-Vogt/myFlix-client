import React from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  
     const { movieId } = useParams();

     const [movie, setMovie] = React.useState(undefined)

     React.useEffect(() => {
      if (movies && movies.length > 0){
       const foundmovie = movies.find((movie) => movie._id === movieId)
       setMovie(foundmovie)
       }
     },[movieId, movies])

     if(!movie){
      return <div>searching...</div>
     }
  
  return (
    <div>
      <div>
        <img className="w-100" src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre?.Name || "No Genre"}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director?.Name || "No Director"}</span>
      </div>
      <Link to="/">
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({ Name: PropTypes.string }),
    Genre: PropTypes.shape({ Name: PropTypes.string }),
  }).isRequired,
};
