import React from 'react';
import { Container, Divider, Grid, InputBase, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const styles = makeStyles(() => ({
  gradient: {
    width: '100%',
    height: '300px',
    background: 'radial-gradient(circle at 81.9% 53.5%, rgb(173, 53, 53) 16.3%, rgb(240, 60, 60) 100.2%)',
    margin: 0,
    padding: 0,
  }
}));

const steps = [
  'Election Application Open',
  'Vote for your favorite candidate',
  'Announcement of the results',
];

export default function Dashboard() {
  const classes = styles();

  const LocalStorage = JSON.parse(localStorage.getItem('user'));
  const name = LocalStorage.name;
  const surname = LocalStorage.surname;
  const sId = LocalStorage.studentNumber;
  const grade = LocalStorage.grade;
  let image;

  if(name === "Cenk") {
    image = require("../../assets/images/user2.jpeg");
  } else {
    image = require("../../assets/images/user.png");
  }
  return (
    <CssBaseline>
      <div className={classes.gradient}>
        <Typography variant="h3" align="left" style={{ color: 'white', paddingTop: '150px', paddingLeft: '50px' }}>
          Hello {name}!
        </Typography>
        <img src={image} alt='profile' align='right' style={{ width: '160px', height: '150px', marginRight: '50px' }} />
      </div>
      <Container>
        <Box sx={{ width: '100%', margin: '100px 0' }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Paper elevation={3} style={{ marginTop: '100px' }}>
          <Typography variant="h5" align="left" style={{ color: 'black', paddingTop: '50px', paddingLeft: '50px' }}>
            Your Profile
          </Typography>
          <Divider style={{ margin: '10px 50px' }} />
          <Grid container spacing={2} style={{ padding: '50px' }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Name</Typography>
              <InputBase
                value={name}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Surname</Typography>
              <InputBase
                value={surname}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Student Number</Typography>
              <InputBase
                value={sId}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Grade</Typography>
              <InputBase
                value={grade}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </CssBaseline>
  );
}
