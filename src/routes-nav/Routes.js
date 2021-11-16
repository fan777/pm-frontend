import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../components/Home';
import Login from '../components/LoginForm';
import Signup from '../components/SignupForm';
import Profile from '../components/ProfileForm';
import Portfolio from '../components/Portfolio';

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
