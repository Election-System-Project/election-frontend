import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import AnnouncementCard from "./components/AnnouncementCard";
import announcementService from "../../services/announcementService";
import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { AddCircleOutline } from "@material-ui/icons";
import AnnouncementAdapter from "../../adapters/AnnouncementAdapter";

const style = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "80%",
    margin: "0 auto",
  },
  button: {
    margin: "10px 10px",
    width: "20%",
  },
}));


function AnnouncementPage() {
  const classes = style();
  const [data, setData] = useState([]);

  //////
  const announcement = [
    {
      title: "General Announcements",
      announcementList: [
        {
          id: 1,
          announceTitle: "Announcement 1",
          content: "This is the content of announcement 1"
        },
        {
          id: 2,
          announceTitle: "Announcement 2",
          content: "This is the content of announcement 1"
        },
        {
          id: 3,
          announceTitle: "Announcement 3",
          content: "This is the content of announcement 1"
        }

      ]
    },
    {
      title: "Result Announcements",
      announcementList: [
        {
          id: 1,
          announceTitle: "Announcement 1",
          content: "This is the content of announcement 1"
        },
        {
          id: 2,
          announceTitle: "Announcement 2",
          content: "This is the content of announcement 1"
        },
        {
          id: 3,
          announceTitle: "Announcement 3",
          content: "This is the content of announcement 1"
        }

      ]
    }
  ]

  //////
  const init = useCallback(async () => {
    const response = await AnnouncementAdapter.getAnnouncements();
    setData(response);
  }, [])


  useEffect(() => {
    init();
  }, [init]);

  return (
    <CssBaseline>
      <Container>
        <Paper 
        elevation={0} 
        className={classes.paper}
        >
          <Button
            variant="contained"
            color="success" endIcon={<AddCircleOutline />}
            className={classes.button}
            href="/announcements/create"
          >
            Create
          </Button>
        </Paper>
        {announcement && announcement.map((value) => {
          return (
            <AnnouncementCard
              title={value.title}
              announcementList={value.announcementList}
            />
          );
        })}
      </Container>
    </CssBaseline >
  );
}

export default AnnouncementPage;
