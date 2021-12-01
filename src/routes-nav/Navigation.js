import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";
import SearchForm from '../components/search/SearchForm';

function Navigation() {
  const { currentUser, logout } = useAuth();

  const loggedInNav = () => {
    return (
      <Nav className="justify-content-end">
        <Navbar.Text>Signed in  as: </Navbar.Text>
        <Nav.Link as={NavLink} to="/profile" className=""><u>{currentUser.username}</u></Nav.Link>
        <Nav.Link as={NavLink} to="/" onClick={logout}>Log Out</Nav.Link>
      </Nav>
    )
  }

  const loggedOutNav = () => {
    return (
      <Nav className="justify-content-end">
        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>
      </Nav>
    )
  }

  return (
    <Navbar bg="light" variant="light" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to='/'>Portfolio Manager</Navbar.Brand>
        <Nav className="flex-grow-1 me-3"><SearchForm /></Nav>
        {currentUser ? loggedInNav() : loggedOutNav()}
      </Container>
    </Navbar >
  )
}

export default Navigation;