export const MovieView = ({ movieData, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movieData.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movieData.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movieData.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movieData.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movieData.director}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};