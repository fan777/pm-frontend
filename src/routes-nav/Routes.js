import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../components/Home';
import Portfolio from '../components/Portfolio';
import Login from '../forms/LoginForm';
import Signup from '../forms/SignupForm';
import Profile from '../forms/ProfileForm';

function Routes() {
  return (
    <Switch>
      <Route exact path='/home' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute exact path='/portfolio' component={Portfolio} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default Routes;
