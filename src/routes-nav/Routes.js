import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/Home';
import SearchResults from '../components/SearchResults';
import QuoteDetailed from '../components/QuoteDetailed';
import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';
import ProfileForm from '../forms/ProfileForm';

function Routes() {

  return (
    <Switch>
      <Route exact path='/home' component={Home} />
      <ProtectedRoute exact path='/login' component={LoginForm} />
      <ProtectedRoute exact path='/signup' component={SignupForm} />
      <PrivateRoute exact path='/profile' component={ProfileForm} />
      <Route path="/results" component={SearchResults} />
      <Route path="/detailed" component={QuoteDetailed} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default Routes;
