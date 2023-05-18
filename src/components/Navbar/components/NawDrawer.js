import React from "react";
import { IconButton, Drawer, Divider, List } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItems from "./MenuItem";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    maxWidth: drawerWidth + 20,
    flexShrink: 0,
    backgroundColor: "#9a1421!important",
  },
  drawerPaper: {
    color: "red",
    backgroundColor: "#999999!important",
    width: drawerWidth,
    maxWidth: drawerWidth + 20,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#999999",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end", //justifyContent: 'space-between',
  },
  drawerButtonIcon: {
    color: "white",
  },
  helpIcon: {
    color: "white",
  },
  options: {
    marginTop: "auto",
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function NavDrawer({
  open,
  drawerList,
  theme,
  handleDrawerClose,
}) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon className={classes.drawerButtonIcon} />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <MenuItems drawerList={drawerList} />
      </List>
    </Drawer>
  );
}
