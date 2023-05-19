import { Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import AnnouncementCard from "./components/AnnouncementCard";

const data = [
  {
    title: "General Announcements",
    announcementList: [
      {
        announceTitle: "Announcement 1",
        content: "This is the content of announcement 1"
      },
      {
        announceTitle: "Announcement 2",
        content: "This is the content of announcement 1"
      },
      {
        announceTitle: "Announcement 3",
        content: "This is the content of announcement 1"
      }

    ]
  },
  {
    title: "Result Announcements",
    announcementList: [
      {
        announceTitle: "Announcement 1",
        content: "This is the content of announcement 1"
      },
      {
        announceTitle: "Announcement 2",
        content: "This is the content of announcement 1"
      },
      {
        announceTitle: "Announcement 3",
        content: "This is the content of announcement 1"
      }

    ]
  }
]

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
