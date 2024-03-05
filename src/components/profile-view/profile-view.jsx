import { useState } from "react";
import { Col, Row, Container, Button, Card, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, setUser }) => {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState(user.Password);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  console.log("user.FavoriteMovies:", user.FavoriteMovies);
  console.log("movies:", movies);

  const favMov = user.FavoriteMovies
    ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id))
    : [];

  console.log("favMov:", favMov);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    console.log(token);
    fetch(`https://testingmovieapi.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update was successful");
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  const handleDelete = () => {
    fetch(`https://testingmovieapi.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        alert("User has been deleted");
        localStorage.clear();
        Navigate("/");
      } else {
        alert("Something went wrong");
      }
    });
  };

  return (
    <Container className="my-3">
      <Row>
        <Col md={5} className="text-center">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>Birthday: {user.Birthday}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className="mt-1">
          <h2>Update Profile</h2>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                className="mb-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">
              Update
            </Button>
            <Button
              onClick={handleDelete}
              className="mt-3 bg-danger border-danger text-white"
            >
              Delete User
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Favorite movies</h2>
        {favMov.map((movieData) => {
          return (
            <Col
              key={movieData._id}
              sm={7}
              md={5}
              lg={3}
              xl={2}
              className="mx-2 mt-2 mb-5 col-6"
            >
              <MovieCard movieData={movieData} setUser={setUser} user={user} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
