import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import 'bootstrap/dist/css/bootstrap.css';

const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif", // Replace with your desired font family
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);