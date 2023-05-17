import React from "react";
import logo from "../assets/images/download.png";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "40px auto",
  },
  altText: {
    margin: "0 auto",
    color: "#9e9e9e",
    fontWeight: "normal",
  },
  title: {
    color: "red",
    marginBottom: 0,
  },
  altTitle: {
    marginTop: 0,
    color: "#bdbfbe",
  },
  inputGrid: {
    margin: "3rem auto 0.5rem",
  },
});

export default function Login() {
  const classes = useStyles();

  return (
    <Grid>
      <Paper
        elevation={10}
        className={classes.paperStyle}
        sx={{
          boxShadow: "0px 8px 20px rgba(255, 0, 0, 0.5)",
        }}
      >
        <Grid align="center">
          <Avatar
            alt="İYTE logo"
            src={logo}
            style={{ width: 100, height: 100 }}
          ></Avatar>
          <h4 className={classes.altText}>IZTECH Election System</h4>
          <h2 className={classes.title}>Log In</h2>
          <h4 className={classes.altTitle}>Log in with your zimbra account</h4>
        </Grid>
        <Grid className={classes.inputGrid}>
          <TextField
            variant="filled"
            sx={{
              "& .MuiFilledInput-underline: before": {
                borderBottomColor: "red",
              },
              "& .MuiFilledInput-underline: after": {
                borderBottomColor: "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "red",
              },
              "& .MuiInputBase-root.Mui-focused": {
                color: "red",
              },
            }}
            margin="dense"
            label="E-mail"
            placeholder="Enter your e-mail"
            type="email"
            fullWidth
            required
          />
          <TextField
            variant="filled"
            sx={{
              "& .MuiFilledInput-underline: before": {
                borderBottomColor: "red",
              },
              "& .MuiFilledInput-underline: after": {
                borderBottomColor: "red",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "red",
              },
              "& .MuiInputBase-root.Mui-focused": {
                color: "red",
              },
            }}
            margin="dense"
            label="Password"
            placeholder="Enter your password"
            type="password"
            fullWidth
            required
          />
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              sx={{
                color: "red",
                "&.Mui-checked": {
                  color: "red",
                },
              }}
            />
          }
          label="Remember me"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "red",
            "&: hover": {
              backgroundColor: "#990000",
            },
            "&:active": {
              backgroundColor: "green",
            },
            fontSize: "15px",
          }}
          fullWidth
        >
          Log In
        </Button>
      </Paper>
    </Grid>
  );
}
