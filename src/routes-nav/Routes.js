import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProtectedRoute from './ProtectedRoute';
import PortfolioRoute from './PortfolioRoute';
import Home from '../components/home/Home';
import SearchResults from '../components/search/SearchResults';
import QuoteDetailed from '../components/detailed/QuoteDetailed';
import Portfolio from '../components/portfolio/Portfolio';
import LoginForm from '../components/forms/LoginForm';
import SignupForm from '../components/forms/SignupForm';
import ProfileForm from '../components/forms/ProfileForm';
import NewPortfolioForm from '../components/forms/NewPortfolioForm';

function Routes() {

  return (
    <Switch>
      <Route exact path='/home' component={Home} />
      <ProtectedRoute exact path='/login' component={LoginForm} />
      <ProtectedRoute exact path='/signup' component={SignupForm} />
      <PrivateRoute exact path='/profile' component={ProfileForm} />
      <PrivateRoute exact path='/create-portfolio' component={NewPortfolioForm} />
      <PortfolioRoute exact path='/portfolio/:id' component={Portfolio} />
      <Route path='/results' component={SearchResults} />
      <Route path='/detailed' component={QuoteDetailed} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default Routes;
