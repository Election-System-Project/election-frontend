import React from "react";
import {
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MailIcon from "@mui/icons-material/Mail";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useCallback } from "react";
import electionScheduleService from "../../services/electionSchedule.service";
import userService from "../../services/user.service";

const styles = makeStyles(() => ({
  gradient: {
    width: "100%",
    height: "300px",
    background:
      "radial-gradient(circle at 81.9% 53.5%, rgb(173, 53, 53) 16.3%, rgb(240, 60, 60) 100.2%)",
    margin: 0,
    padding: 0,
  },
}));

const steps = [
  "Election Application Open",
  "Vote for your favorite candidate",
  "Announcement of the results",
];

export default function Dashboard() {
  const classes = styles();

  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const LocalStorage = JSON.parse(localStorage.getItem("user"));
  const name = LocalStorage.name;
  const surname = LocalStorage.surname;
  const sId = LocalStorage.studentNumber;
  const grade = LocalStorage.grade;
  let image;

  if (name === "Cenk") {
    image = require("../../assets/images/user2.jpeg");
  } else {
    image = require("../../assets/images/user.png");
  }

  const electionDateTime = useCallback(async () => {
    await electionScheduleService.getElectionDates().then((res) => {
      if (!res || res.status !== 200) {
        throw new Error("Failed to get election dates");
      }

      const electionDates = res.data.dates[0];
      console.log(electionDates);
      if (electionDates) {
        setStartDate(
          new Date(electionDates.startDate).getDate() +
          "/" +
          (new Date(electionDates.startDate).getMonth() + 1) +
          "/" +
          new Date(electionDates.startDate).getFullYear() +
          " " +
          new Date(electionDates.startDate).getHours() +
          ":" +
          new Date(electionDates.startDate).getMinutes()
        );
        setEndDate(
          new Date(electionDates.endDate).getDate() +
          "/" +
          (new Date(electionDates.endDate).getMonth() + 1) +
          "/" +
          new Date(electionDates.endDate).getFullYear() +
          " " +
          new Date(electionDates.endDate).getHours() +
          ":" +
          new Date(electionDates.endDate).getMinutes()
        );
      }
    });
  }, []);

  React.useEffect(() => {
    electionDateTime();
  }, []);

  const messagesService = async () => {
    await userService.getMessages({ studentid: sId }).then((res) => {
      if (!res || res.status !== 200) {
        throw new Error("Failed to get messages");
      }
      setMessages(res.data);
    });
  };

  React.useEffect(() => {
    messagesService();
  }, []);

  return (
    <CssBaseline>
      <div className={classes.gradient}>
        <Typography
          variant="h3"
          align="left"
          style={{ color: "white", paddingTop: "150px", paddingLeft: "50px" }}
        >
          Hello {name}!
        </Typography>
        <img
          src={image}
          alt="profile"
          align="right"
          style={{ width: "160px", height: "150px", marginRight: "50px" }}
        />
      </div>
      <Container>
        <Box sx={{ width: "100%", margin: "100px 0" }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Paper elevation={3} style={{ marginTop: "100px" }}>
          <Typography
            variant="h5"
            align="left"
            style={{ color: "black", paddingTop: "50px", paddingLeft: "50px" }}
          >
            <CalendarMonthIcon
              style={{
                fontSize: "3.5rem",
                marginBottom: "0.5rem",
                color: "rgb(173, 53, 53)",
              }}
            />{" "}
            Election Schedule
          </Typography>
          <Divider style={{ margin: "10px 50px" }} />
          <Grid container spacing={2} style={{ padding: "50px" }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Election Start Date</Typography>
              <InputBase value={startDate} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Election End Date</Typography>
              <InputBase value={endDate} fullWidth disabled />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} style={{ marginTop: "100px" }}>
          <Typography
            variant="h5"
            align="left"
            style={{ color: "black", paddingTop: "50px", paddingLeft: "50px" }}
          >
            <MailIcon
              style={{
                fontSize: "3.5rem",
                marginBottom: "0.5rem",
                color: "rgb(173, 53, 53)",
              }}
            />{" "}
            Messages
          </Typography>
          <Divider style={{ margin: "10px 50px" }} />
          <Grid container spacing={2} style={{ padding: "50px" }}>
            {(messages.length === 0 || messages === undefined) ? <Grid item xs={12}> <Typography variant="h6" component="h2" gutterBottom style={{ textAlign: 'center', color: 'grey' }}> No Data </Typography> </Grid> : messages.map((message) => {
              return (
                <>
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        background: "rgb(173, 53, 53)",
                        color: "#fff",
                        textAlign: "center",
                      }}
                    >
                      System
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="subtitle1">
                      {message.content}
                    </Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Paper>

        <Paper elevation={3} style={{ marginTop: "100px" }}>
          <Typography
            variant="h5"
            align="left"
            style={{ color: "black", paddingTop: "50px", paddingLeft: "50px" }}
          >
            <InsertEmoticonIcon
              style={{
                fontSize: "3.5rem",
                marginBottom: "0.5rem",
                color: "rgb(173, 53, 53)",
              }}
            />{" "}
            Your Profile
          </Typography>
          <Divider style={{ margin: "10px 50px" }} />
          <Grid container spacing={2} style={{ padding: "50px" }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Name</Typography>
              <InputBase value={name} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Surname</Typography>
              <InputBase value={surname} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Student Number</Typography>
              <InputBase value={sId} fullWidth disabled />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Grade</Typography>
              <InputBase value={grade} fullWidth disabled />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}
