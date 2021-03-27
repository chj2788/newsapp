import React from "react";
import { Redirect, Route } from "react-router";

type Props = {
  loggedIn: boolean;
  exact?: boolean | undefined;
  path?: string | undefined;
};

const PrivateRoute: React.FC<Props> = ({
  children,
  loggedIn,
  ...routeProps
}) => {
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
