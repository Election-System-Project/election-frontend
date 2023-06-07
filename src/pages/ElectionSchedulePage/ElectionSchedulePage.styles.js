import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  applicationForm: {
    backgroundColor: "rgba(217, 217, 217, 0.28)",
    minHeight: "600px",
    padding: "5rem",
    borderRadius: "3px",
    marginTop: "20px",
  },
  hiddenInput: {
    display: "none",
  },
  fileName: {
    marginTop: theme.spacing(1),
  },
  text: {
    display: "inline-block",
    minWidth: "550px",
  },
  applicationCard: {
    padding: "1rem",
    paddingRight: "0",
    backgroundColor: "#C0c0c0",
    margin: "0 0 2rem",
    borderRadius: "1rem",
    maxWidth: "1200px",
  },
}));

export default useStyles;
