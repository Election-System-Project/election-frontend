import { Container, CssBaseline, Grid, Paper } from "@material-ui/core";
import React from "react";
import AnnouncementCard from "./components/AnnouncementCard";

const demoList = [
  "Merhaba",
  "Naber",
  "Güzelim"
]

function AnnouncementPage() {

  return (
    <CssBaseline>
      <Container>
        <AnnouncementCard title="General Announcements" announcementList={demoList} />
        <AnnouncementCard title="Result Announcements" announcementList={demoList} />
      </Container>
    </CssBaseline>
  );
}

export default AnnouncementPage;
