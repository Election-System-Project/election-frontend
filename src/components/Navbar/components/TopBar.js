import React from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Grid } from '@mui/material';
// import { Menu } from '@material-ui/icons';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SessionHelper from "../../../helpers/SessionHelper";
import logo from "../../../assets/images/uni_logo.jpg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography?.fontFamily, // Accessing the fontFamily property from the theme object
    // Other style properties
  },
  appBar: {
    fontFamily: theme.typography?.fontFamily?.Helvetica,
    backgroundColor: "#9a1421!important",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)!important`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: theme.zIndex.drawer,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: "1!important",
    display: "flex",
    alignItems: "center"
  },
  titleTypography: {
    textDecoration: "none",
    // color: "#FFFFFF",
  },
  avatar: {
    margin: "0 auto",
    width: 120,
    height: "auto",
    marginLeft: "2rem",
  },
  logoutButton: {
    border: "1px solid gray",
    width: "90px",
    margin: "0 auto",
  },
}));

/**
 * A component that renders the top navigation bar with a drawer and logout button.
 * @param {open: boolean, handleDrawerOpen: func, logout: func} param properties of the topbar component
 */
export default function TopBar({ open, handleDrawerOpen, logout }) {
  const classes = useStyles();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Grid className={classes.title}>
          <a href="/dashboard">
            <img className={classes.avatar} alt={logo} src={logo} />
          </a>
          <Typography style={{marginLeft: "1rem"}} variant="h5">IZTECH Election System</Typography>
        </Grid>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            className={classes.titleTypography}
            variant="subtitle2"
            noWrap
          >
            {SessionHelper.getUser().name +
              " " +
              SessionHelper.getUser().surname}
          </Typography>
          <Button
            onClick={logout}
            color="inherit"
            size="small"
            className={classes.logoutButton}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
