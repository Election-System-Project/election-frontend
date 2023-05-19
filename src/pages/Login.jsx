import React from "react";
import { useHistory } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import authService from "../services/auth.service";
import SessionHelper from "../helpers/SessionHelper";

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
    color: "#b31726",
    marginBottom: 0,
    marginTop: "3.5rem"
  },
  altTitle: {
    margin: "0 auto",
    color: "#bdbfbe",
  },
  inputGrid: {
    margin: "1rem auto 0.5rem",
  },
  buttonContainer: {
    marginTop: 10,
    textAlign: "center",
  },
});

export default function Login({ update, setUpdate }) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // const res = authService.login(email, password);
    const res = {
      status: 200,
      content: {
        name: "Sude Nur",
        surname: "Çevik",
        email: email,
      },
    };
    if (res?.status === 200) {
      let data = res.content;
      console.log(data);
      SessionHelper.setUser(data);
      setUpdate(!update);
      history?.location?.state
        ? history.push(history?.location?.state?.from?.pathname)
        : history.push("/dashboard");
      setLoading(false);
    } else {
      // console.log(res?.data?.message);  fix after backend deployment
      console.log("error");
    }
  };

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
          <h5 className={classes.altText}>IZTECH Election System</h5>
          <h2 className={classes.title}>Log In</h2>
          <h6 className={classes.altTitle}>Log in with your zimbra account</h6>
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
            onChange={(email) => setEmail(email.target.value)}
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
            onChange={(password) => setPassword(password.target.value)}
          />
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              sx={{
                color: "#b31726",
                "&.Mui-checked": {
                  color: "#b31726",
                },
              }}
            />
          }
          style={{marginTop:20}}
          label="Remember me"
        />
        <div className={classes.buttonContainer}>
          {loading ? (
            <CircularProgress style={{ color: "#999" }} />
          ) : (
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#b31726",
                "&: hover": {
                  backgroundColor: "#990000",
                },
                "&:active": {
                  backgroundColor: "green",
                },
                fontSize: "15px",
              }}
              fullWidth
              onClick={(e) => handleLogin(e)}
            >
              Log In
            </Button>
          )}
        </div>
      </Paper>
    </Grid>
  );
}
