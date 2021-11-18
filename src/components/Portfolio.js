import { Container } from 'react-bootstrap';
import { useAuth } from "../hooks/useAuth";

const Portfolio = () => {
  const { currentUser } = useAuth();
  return (
    <Container fluid>
      <p>Portfolio</p>
      {currentUser
        ? <p>Welcome {currentUser?.username}</p>
        : ""}
    </Container>
  )
}

export default Portfolio;
