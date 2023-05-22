import { Container, CssBaseline } from "@material-ui/core";
import React, { useCallback } from "react";
import AnnouncementCard from "./components/AnnouncementCard";
import announcementService from "../../services/announcementService";

import { useEffect, useState } from "react";
import { Button, Paper } from "@mui/material";
import { AddCircleOutline } from "@material-ui/icons";


function AnnouncementPage() {

  const [data, setData] = useState([]);

  const init = useCallback(async () => {
    announcementService.fetchData()
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
        <Paper elevation={0} sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '80%',
          margin: "0 auto",
        }}>
          <Button
            variant="contained"
            color="success" endIcon={<AddCircleOutline />}
            sx={{ margin: '10px 10px', width: '20%' }}
            href="/announcements/create"
          >
            Create
          </Button>
        </Paper>
        {data && data.map((value) => {
          return (
            <AnnouncementCard title={value.title} announcementList={value.announcementList} />
          )
        })}
        {/* <AnnouncementCard title="General Announcements" announcementList={demoList} />
        <AnnouncementCard title="Result Announcements" announcementList={demoList} /> */}
      </Container>
    </CssBaseline >
  );
}

export default AnnouncementPage;
