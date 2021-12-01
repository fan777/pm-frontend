import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, exact, path }) => {
  const { token } = useAuth();

  useEffect(() => {
    console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "token=", token,
    );
  })

  return (
    <Route exact={exact} path={path} render={(props) => token
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    } />
  )
}

export default PrivateRoute;