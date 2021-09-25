import React, { FC, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { AppRoutes } from "./constants/contants";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
import ProtectedRoute from "./helpers/protectedRoute";
import IsUserLoggedIn from './helpers/isUserLoggedIn';

const Login = lazy(() => import("./pages/loginPage"));
const SignUp = lazy(() => import("./pages/signUpPage"));
const Dashboard = lazy(() => import("./pages/dashboardPage"));
const Profile = lazy(() => import("./pages/profilePage"));
const NotFound = lazy(() => import("./pages/notFoundPage"));

const App: FC = () => {

  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={AppRoutes.DASHBOARD}
              path={AppRoutes.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>

            <IsUserLoggedIn
              user={user}
              loggedInPath={AppRoutes.DASHBOARD}
              path={AppRoutes.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>

            <Route path={AppRoutes.PROFILE} component={Profile} />

            <ProtectedRoute
              user={user}
              path={AppRoutes.DASHBOARD}
              exact
            >
              <Route path={AppRoutes.DASHBOARD} component={Dashboard} />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
