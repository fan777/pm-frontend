import { Container } from 'react-bootstrap';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './routes-nav/Navigation';
import Routes from './routes-nav/Routes';

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Container>
        <Routes />
      </Container>
    </AuthProvider>
  );
}

export default App;
