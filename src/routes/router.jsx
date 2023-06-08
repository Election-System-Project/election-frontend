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
import electionScheduleService from "../services/electionSchedule.service";
import { useEffect } from "react";

// lazy loading components for better performance
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

const ElectionSchedulePage = lazy(() => import("../pages/ElectionSchedulePage/ElectionSchedulePage"));

const AnnouncementPage = lazy(() => import("../pages/AnnouncementPage/AnnouncementPage"));
const AnnouncementDetailsPage = lazy(() => import("../pages/AnnouncementPage/AnnouncementDetailsPage"));
const AnnouncementCreatePage = lazy(() => import("../pages/AnnouncementPage/AnnouncementCreatePage"));
const ResultApprovementPage = lazy(() => import("../pages/ResultApprovementPage/ResultApprovementPage"));
const ApplicationApprovementPage = lazy(() => import("../pages/ApplicationApprovementPage/ApplicationApprovementPage"));

const ResultApprovementDetailsPage = lazy(() => import("../pages/ResultApprovementPage/ResultApprovementDetailsPage"));
const ApplicationPage = lazy(() => import("../pages/ApplicationPage/ApplicationPage"));
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
    path: "/approvements/results/:name",
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
    path: "/electionSchedule",
    component: ElectionSchedulePage,
    exact: true,
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
  const [active, setActive] = React.useState(false);

  const electionDateTime = useCallback(async () => {
    await electionScheduleService.getElectionDates().then((res) => {
      if (!res || res.status !== 200) {
        throw new Error("Failed to get election dates");
      }
      const currentDateTime = Date.now();
      const electionDates = res.data.dates[0];
      console.log(electionDates)
      if (electionDates) {
        const electionStart = new Date(electionDates.startDate).getTime();
        const electionEnd = new Date(electionDates.endDate).getTime();

        console.log(currentDateTime, electionStart, electionEnd)

        if (currentDateTime < electionStart) {
          setActive(false);
        } else if (currentDateTime > electionStart && currentDateTime < electionEnd) {
          console.log("entered")
          setActive(true);
        } else {
          setActive(false);
        }
      }
    });
  }, [])

  const populateDrawerList = useCallback(() => {
    if (user) {
      const roles = user?.roles;
      const authorization = getViewAuthorizationForAll(roles);

      let drawerList = [
        { label: "Dashboard", Path: "/dashboard" },
        active && authorization.application && {
          label: "Apply for Department Candidacy",
          Path: "/applicationForm",
        },
        authorization.electionSchedule && { label: "Election Schedule", Path: "/electionSchedule" },
        { label: "Announcements", Path: "/announcements" },
        active && authorization.vote && { label: "Vote for Department Representatives", Path: "/vote" },
        active && authorization.resultApprovement && { label: "Result Approvement", Path: "/approvements/result" },
        active && authorization.applicationApprovement && { label: "Application Approvement", Path: "/approvements/application" },
        active && authorization.candidateStatus && { label: "Candidate Status", Path: "/status" },
      ];
      setDrawerList(drawerList);
    }
  }, [user, update, active]);

  const init = useCallback(() => {
    console.log(active)
    electionDateTime();
    populateDrawerList();
  }, [populateDrawerList, update, electionDateTime, active ]);

  React.useEffect(() => {
    init();
  }, [init, user,electionDateTime, active]);

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
