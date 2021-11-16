import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './routes-nav/Navigation';
import Routes from './routes-nav/Routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
