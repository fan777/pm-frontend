import { Route, Switch, Redirect } from 'react-router-dom';

import Home from '../home/Home';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ProfileForm from '../auth/ProfileForm';

const Routes = () => {

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/login'>
        <LoginForm />
      </Route>
      <Route exact path='/signup'>
        <SignupForm />
      </Route>
      <Route exact path='/profile'>
        <ProfileForm />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default Routes;