import { AuthProvider } from './hooks/useAuth';
import Navigation from './routes-nav/Navigation';
import Routes from './routes-nav/Routes';

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes />
    </AuthProvider>
  );
}

export default App;
