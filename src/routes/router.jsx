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
import Loading from "../components/Loading";

// lazy loading components for better performance
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

const AnnouncementPage = lazy(() => import("../pages/AnnouncementPage/AnnouncementPage"));
const AnnouncementDetailsPage = lazy(() => import("../pages/AnnouncementPage/AnnouncementDetailsPage"));
const AnnouncementCreatePage = lazy(() => import("../pages/AnnouncementPage/AnnouncementCreatePage"));
const ResultApprovementPage = lazy(() => import("../pages/ResultApprovementPage/ResultApprovementPage"));
const ApplicationApprovementPage = lazy(() => import("../pages/ApplicationApprovementPage/ApplicationApprovementPage"));

const ResultApprovementDetailsPage = lazy(() => import("../pages/ResultApprovementPage/ResultApprovementDetailsPage"));
const ApplicationPage = lazy(() =>  import("../pages/ApplicationPage/ApplicationPage"));
const Status = lazy(() => import("../pages/StatusPage/StatusPage"));

const NotFound = lazy(() => import("../components/NotFound"));
const VotePage = lazy(() => import("../pages/VotePage/VotePage"));

const auth = [
  {
    path: "/login",
    component: Login,
    exact: false,
  },
];

const privateRoutes = [
  {
    path: "/announcements/:title/:id",
    component: AnnouncementDetailsPage,
    exact: true,
  },
  {
    path: "/announcements/delete/:id",
    component: AnnouncementCreatePage,
    exact: true,
  },
  {
    path: "/announcements/create",
    component: AnnouncementCreatePage,
    exact: true,
  },
  {
    path: "/announcements",
    component: AnnouncementPage,
    exact: true,
  },
  {
    path: "/approvements/result/:name",
    component: ResultApprovementDetailsPage,
    exact: true
  },
  {
    path: "/approvements/result",
    component: ResultApprovementPage,
    exact: true,
  },
  {
    path: "/approvements/application",
    component: ApplicationApprovementPage,
    exact: true
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/vote",
    component: VotePage,
    exact: true,
  },
  {
    path: "/applicationForm",
    component: ApplicationPage,
  },
  {
    path: "/status",
    component: Status,
    exact: true,
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
        authorization.application && {
          label: "Apply for Department Candidacy",
          Path: "/applicationForm",
        },
        { label: "Announcements", Path: "/announcements" },
        { label: "Vote for Department Representatives", Path: "/vote" },
        { label: "Result Approvement", Path: "/approvements/result" },
        { label: "Application Approvement", Path: "/approvements/application" },
        { label: "Candidate Status", Path: "/status" },

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
      <Route path="*" component={NotFound} />
    </Switch>
  );

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          {auth.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component update={update} setUpdate={setUpdate} />
            </Route>
          ))}
          <PrivateRoute>
            <ProtectedRoutes />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
}
