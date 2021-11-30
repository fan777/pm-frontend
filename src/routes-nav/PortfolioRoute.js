import { Route, Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PortfolioRoute = ({ component: Component, exact, path }) => {
  const location = useLocation();
  const { token, currentUser } = useAuth();

  const getPortfolioIdFromLocation = () => {
    return Number(location.pathname.split('/')[2]);
  }

  const validatePortfolioOwnership = () => {
    return currentUser?.portfolios?.map(p => p.id).includes(getPortfolioIdFromLocation());
  }

  // useEffect(() => {
  //   console.debug(
  //     "PortfolioRoute",
  //     "username=", currentUser?.username,
  //     "location=", location,
  //     "id=", getPortfolioIdFromLocation(),
  //     "currentUser=", currentUser,
  //   );
  // })

  return (
    <Route exact={exact} path={path} render={(props) => token && validatePortfolioOwnership()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
    } />
  )
}

export default PortfolioRoute;