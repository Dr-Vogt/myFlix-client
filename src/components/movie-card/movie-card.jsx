import React from "react";
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movieData }) => {
    return (
        <Card className="h-100" class="Card">
            <Card.Img variant="top" src={movieData.ImagePath} />
            <Card.Body class="Card">
                <Card.Title>{movieData.Title}</Card.Title>
                <Card.Text>{movieData.Description}</Card.Text>
                <Card.Text>{movieData.Genre.Name}</Card.Text>
                <Card.Text>{movieData.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>   
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
    })
};