import React, { useCallback, lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { getViewAuthorizationForAll } from "../helpers/AuthorizationHelper";
import SessionHelper from "../helpers/SessionHelper";
import Navbar from "../components/Navbar/navbar";

// lazy loading components for better performance
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AnnouncementPage = lazy(() =>
 
  import("../pages/AnnouncementPage/AnnouncementPage")
);
const AnnouncementDetailsPage = lazy(() =>
  import("../pages/AnnouncementPage/AnnouncementDetailsPage")

);
const NotFound = lazy(() => import("../components/NotFound"));

const auth = [
  {
    path: "/login",
    component: Login,
    exact: false,
  },
];

const privateRoutes = [
const privateRoutes = [
  {
    path: "/announcements",
    component: AnnouncementPage,
  },
  {
    path: "/announcement/:id",
    component: AnnouncementDetailsPage,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function AppRoutes() {
  const user = SessionHelper.getUser();
  const [drawerList, setDrawerList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);

  const populateDrawerList = useCallback(() => {
    if (user) {
      const roles = user?.roles;
      const authorization = getViewAuthorizationForAll(roles);

      let drawerList = [
        { label: "Dashboard", Path: "/dashboard" },
        { label: "Announcements", Path: "/announcements" },
      ];
      setDrawerList(drawerList);
    }
  }, [user, update]);

  const init = useCallback(() => {
    populateDrawerList();
  }, [populateDrawerList, update]);

  React.useEffect(() => {
    init();
  }, [init, user]);

  const ProtectedRoutes = () => (
    <Switch>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact}>
          <Navbar drawerList={drawerList} component={<route.component />} />
        </Route>
      ))}
      {/* Add the NotFound route here */}
      <Route component={NotFound} />
    </Switch>
  );

  const ProtectedRoutes = () => (
    <Switch>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} exact={route.exact}>
          <Navbar drawerList={drawerList} component={<route.component />} />
        </Route>
      ))}
      {/* Add the NotFound route here */}
      <Route component={NotFound} />
    </Switch>
  );

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/" exact component={LandingPage} />
          {auth.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component update={update} setUpdate={setUpdate} />
            </Route>
          ))}
          <PrivateRoute path="/">
            <ProtectedRoutes />
            <ProtectedRoutes />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
