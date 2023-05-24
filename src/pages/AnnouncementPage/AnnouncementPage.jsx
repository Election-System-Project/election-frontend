import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import AnnouncementCard from "./components/AnnouncementCard";
import announcementService from "../../services/announcement.service";
import SessionHelper from "../../helpers/SessionHelper";
import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { AddCircleOutline } from "@material-ui/icons";
import SessionHelper from "../../helpers/SessionHelper";
import NoData from "../../components/NoData";
import { useLocation } from 'react-router-dom';

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
  
  // const f = [
  //   {
  //     title: "Announcements",
  //     announcementList: [
  //       {
  //         id: 1,
  //         announceTitle: "Announcement 1",
  //         announceContent: "Announcement 1 Content",
  //       },
  //       {
  //         id: 2,
  //         announceTitle: "Announcement 2",
  //         announceContent: "Announcement 2 Content",
  //       },
  //       {
  //         id: 3,
  //         announceTitle: "Announcement 3",
  //         announceContent: "Announcement 3 Content",
  //       },
  //     ]
  //   }
  // ]
  
  const classes = style();

  const [data, setData] = useState([]);
  const roles = SessionHelper.getUser().roles;
  const isAdmin = roles?.includes("Admin");
  const isDeansOffice = roles?.includes("DeansOffice");


  const location = useLocation();

  const fetchData = useCallback(async () => {
    await announcementService.fetchData().then((res) => {
      if (!res || res.status !== 200) {
        throw new Error("Failed to get announcements");
      }
      setData(res.data.array);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (location.state && location.state.refresh) {
      fetchData();
    }
  }, [fetchData, location.state]);

  return (
    <CssBaseline>
      <Container>
        <Paper
          elevation={0}
          className={classes.paper}
        >
          { data.length !== 0 && (isAdmin || isDeansOffice) && (
            <Button
              variant="contained"
              color="success" endIcon={<AddCircleOutline />}
              className={classes.button}
              href="/announcements/create"
            >
              Create
            </Button>
          )}
        </Paper>
        {data.length !== 0 && 
        data.map((value, index) => {
          return (
            <AnnouncementCard
              key={index}
              title={value.title}
              announcementList={value.announcementList}
            />
          );
        })}
        {data.length === 0 && <NoData />}
      </Container>
    </CssBaseline>
  );
}

export default AnnouncementPage;
