import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput }) => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>MyFlix</Navbar.Brand>
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Form>
                  <Form.Control
                    id="search-bar"
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearchInput}
                  />
                </Form>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
