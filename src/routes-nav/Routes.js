import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/Home';
// import Portfolio from '../components/Portfolio';
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
      <Redirect to="/home" />
    </Switch>
  )
}

export default Routes;
