import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ component: Component, exact, path }) => {
  const { token } = useAuth();

  useEffect(() => {
    console.debug(
      "ProtectedRoute",
      "exact=", exact,
      "path=", path,
      "token=", token,
    );
  })

  return (
    <Route exact={exact} path={path} render={(props) => token === null
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    } />
  )
}

export default ProtectedRoute;