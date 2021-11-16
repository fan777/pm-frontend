import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

function Navigation() {
  const { currentUser, logout } = useAuth();

  const loggedInNav = () => {
    return (
      <>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/portfolio">Portfolio</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
          <Nav.Link as={NavLink} to="/" onClick={logout}>Log Out, {currentUser.username}</Nav.Link>
        </Nav>
      </>
    )
  }

  const loggedOutNav = () => {
    return (
      <>
        <Nav className="justify-content-end">
          <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
        </Nav>
      </>
    )
  }

  return (
    <Navbar bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Portfolio Manager</Navbar.Brand>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Container>
    </Navbar >
  )
}

export default Navigation;