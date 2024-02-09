import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div
         onClick={() => {
            onMovieClick(movieData);
         }}
        >
            {movieData.title}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
    })
};