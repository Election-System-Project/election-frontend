import React, { useCallback, useState, useEffect } from "react";
import clsx from "clsx";
import { CssBaseline } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import SessionHelper from "../../helpers/SessionHelper";
import { useHistory } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NavDrawer from "./components/NawDrawer";
import TopBar from "./components/TopBar";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "1em",
    },
    "*::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
    },
    "*::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "rgba(0,0,0,.3)",
    },
  },
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth + 40,
  },
}));

const Navbar = React.memo(function Navbar({ component, drawerList }) {
  const history = useHistory();
  const classes = useStyles();

  const theme = useTheme();
  const darkTheme = createTheme({ palette: { type: "dark" } });
  const lightTheme = createTheme({ palette: { type: "light" } });

  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode")
  );

  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(true);

  const init = useCallback(async () => {
    // Initialization logic
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const logout = () => {
    SessionHelper.deleteUser();
    history.push("login");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
      <CssBaseline>
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          logout={logout}
        />
        <NavDrawer
          open={open}
          drawerList={drawerList}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {component}
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
});

export default Navbar;
