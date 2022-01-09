import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ({ user, component: Component, path, ...rest }) => {
  return ( 
    <Route
      {...rest}
      path={path}
      render={(props) =>
          <Component user={user} {...props} />
      }
    />
  );
};

export default PrivateRoute;