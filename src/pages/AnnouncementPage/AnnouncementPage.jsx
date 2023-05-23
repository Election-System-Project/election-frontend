import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import AnnouncementCard from "./components/AnnouncementCard";
import announcementService from "../../services/announcementService";
import SessionHelper from "../../helpers/SessionHelper";
import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { AddCircleOutline } from "@material-ui/icons";
import NoData from "../../components/NoData";

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

  const roles = SessionHelper.getUser().roles;
  const isAdmin = roles?.includes("Admin");
  const isDeansOffice = roles?.includes("DeansOffice");

  const init = useCallback(async () => {
    await announcementService.fetchData()
      .then((res) => {
        if (!res) {
          if (!res.status === 200) {
            throw new Error("Failed to get announcements");
          }
        }
        else {
          setData(res.data.array);
        }
      });
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
        {data.length !== 0 && data.map((value) => {
          return (
            <AnnouncementCard
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
