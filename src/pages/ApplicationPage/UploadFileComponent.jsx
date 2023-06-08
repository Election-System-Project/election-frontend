import React from "react";
import useStyles from "./ApplicationPage.styles";
import { Button, Typography, CircularProgress } from "@mui/material";
import { Delete } from "@material-ui/icons";

function UploadFileComponent({
  text,
  index,
  handleFileUpload,
  handleDeleteFile,
  files,
  disabled,
  loading,
}) {
  const classes = useStyles();
  return (
    <div className={classes.applicationCard}>
      <div className={classes.text}>
        <Typography variant="p">{text}</Typography>
        <Typography variant="p" sx={{ color: "red" }}>
          {" "}
          *
        </Typography>
      </div>
      <input
        type="file"
        id={text}
        className={classes.hiddenInput}
        onChange={(e) => {
          handleFileUpload(e, index);
        }}
      />
      <label htmlFor={text} aria-required>
        <Button
          variant="contained"
          component="span"
          disabled={disabled}
          sx={{
            backgroundColor: "white",
            color: "black",
            "&:hover": {
              backgroundColor: "#b31726",
              color: "white",
            },
          }}
        >
          Choose a File
        </Button>
      </label>
      {loading ? (
        <CircularProgress style={{ color: "#999" }} />
      ) : (
        files &&
        files?.length !== 0 && (
          <Typography
            variant="body1"
            className={classes.fileName}
            sx={{
              display: "inline-block",
              border: "dashed",
              marginLeft: "2rem",
              padding: "1rem",
              maxWidth: "400px",
              height: "auto",
            }}
          >
            {files?.name}
            <Button
              onClick={() => handleDeleteFile(index)}
              sx={{
                display: "inline-block",
                color: "white",
                justifyContent: "right",
              }}
              disabled={disabled}
            >
              <Delete />
            </Button>
          </Typography>
        )
      )}
    </div>
  );
}

export default UploadFileComponent;
