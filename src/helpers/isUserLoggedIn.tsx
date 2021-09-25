import { FC } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AppRoutes } from '../constants/contants';

type ProtectedRouteType = {
  user?: any,
  loggedInPath: string,
  path: string,
  children: any,
}

const IsUserLoggedIn: FC<ProtectedRouteType> = ({
  user, loggedInPath, path, children
}: ProtectedRouteType) => {
  console.log("2");

  return (
    <Route
      path={path}
      render={({ location }) => {
        if (!user) {
          return children
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

IsUserLoggedIn.displayName = "IsUserLoggedIn";

export default IsUserLoggedIn;