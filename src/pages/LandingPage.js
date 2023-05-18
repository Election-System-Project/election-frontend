import React from "react";
import SessionHelper from "../helpers/SessionHelper";

const LandingPage = (props) => {
  console.log(props);
  const { history } = props;
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  console.log("LoggedIn = ", isLoggedIn);
  if (isLoggedIn) {
    history.push("dashboard");
  } else history.push("login");

  return <div>hıı</div>;
};

export default LandingPage;
