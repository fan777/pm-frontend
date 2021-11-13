import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {


  return (
    <>
      <Navbar className="px-3" bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand href="/">Portfolio Manager</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/link1">Link1</Nav.Link>
            <Nav.Link href="/link2">Link2</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/logout">Log Out</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;