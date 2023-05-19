import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import AnnouncementCard from "./components/AnnouncementCard";
import data from "./Announcement";
// import { useEffect, useState } from "react";


function AnnouncementPage() {

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/announcementController/announcements');
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <CssBaseline>
      <Container>
        {data.map((value) => {
          return (
            <AnnouncementCard title={value.title} announcementList={value.announcementList} />
          )
        })}
        {/* <AnnouncementCard title="General Announcements" announcementList={demoList} />
        <AnnouncementCard title="Result Announcements" announcementList={demoList} /> */}
      </Container>
    </CssBaseline>
  );
}

export default AnnouncementPage;
