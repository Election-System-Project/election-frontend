import React from "react";
import { makeStyles } from "@mui/styles";

import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Home, List } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    color: "white!important",
  },
  nested: {
    paddingLeft: theme.spacing(4), // Update the spacing value if needed
  },
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component
 */
export default function RenderMenuItem({ value, index, outer }) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    history.push(value?.Path);
  };

  return (
    <ListItem
      button
      key={value?.label}
      onClick={onClick}
      className={!outer && classes.nested}
    >
      <ListItemIcon className={classes.listItemIcon}>
        {index === 0 && outer ? <Home /> : <List />}
      </ListItemIcon>
      <ListItemText style={{color: "white"}} primary={value?.label} />
    </ListItem>
  );
}
