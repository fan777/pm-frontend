import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import Home from '../components/home/Home';
import SearchResults from '../components/search/SearchResults';
import QuoteDetailed from '../components/detailed/QuoteDetailed';
import Portfolio from '../components/portfolio/Portfolio';
import LoginForm from '../components/user/LoginForm';
import SignupForm from '../components/user/SignupForm';
import ProfileForm from '../components/user/ProfileForm';
import NewPortfolioForm from '../components/portfolio/NewPortfolioForm';

function Routes() {

  return (
    <Switch>
      <Route exact path='/home' component={Home} />
      <ProtectedRoute exact path='/login' component={LoginForm} />
      <ProtectedRoute exact path='/signup' component={SignupForm} />
      <PrivateRoute exact path='/profile' component={ProfileForm} />
      <PrivateRoute exact path='/portfolio/add' component={NewPortfolioForm} />
      <PrivateRoute exact path='/portfolio/:id' component={Portfolio} />
      <Route path='/results' component={SearchResults} />
      <Route path='/detailed' component={QuoteDetailed} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default Routes;
