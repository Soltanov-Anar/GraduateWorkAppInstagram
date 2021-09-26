import { FC, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import UserContext from "./context/user";
import useAuthListener from "./hooks/useAuthListener";
import ReactLoader from './components/loader';
import { AppRoutes } from "./constants/contants";


import ProtectedRoute from "./helpers/protectedRoute";

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
        <Suspense fallback={<ReactLoader />}>
          <Switch>

            <Route path={AppRoutes.LOGIN} component={Login} />
            <Route path={AppRoutes.SIGN_UP} component={SignUp} />
            <Route path={AppRoutes.PROFILE} component={Profile} />

            <ProtectedRoute
              user={user}
              path={AppRoutes.DASHBOARD}
              exact
            >
              <Dashboard user={user} />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
