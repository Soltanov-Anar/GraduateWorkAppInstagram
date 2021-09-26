import { FC, cloneElement } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppRoutes } from "../constants/contants";

type ProtectedRouteType = {
  user?: any,
  path: string,
  exact: boolean
  children: any,
}

const ProtectedRoute: FC<ProtectedRouteType> = ({
  user, children, path, exact
}: ProtectedRouteType) => {

  return (
    <Route
      path={path}
      exact={exact}
      render={({ location }) => {
        if (user) {
          return cloneElement(children, { user });
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: AppRoutes.LOGIN,
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

ProtectedRoute.displayName = "ProtectedRoute";

export default ProtectedRoute;