import { useParams } from "react-router";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


export const MovieView = ({ movieData }) => {
  {/* const { movieId } = useParams();

{/*const movieData = movies.find((movie) => movie.id === movieId)*/}
    return (
        <div>
            <div>
                <img className="w-100" src={movieData.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movieData.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movieData.Description}</span>
            </div>
            <div>
            <span>Genre: </span>
            <span>{movieData.Genre?.Name || "No Genre"}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movieData.Director?.Name || "No Director"}</span>
            </div> 
            <Link to="/">
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

MovieView.propTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({ Name: PropTypes.string }),
        Genre: PropTypes.shape({ Name: PropTypes.string }),
    }).isRequired
};