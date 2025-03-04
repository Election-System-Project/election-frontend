import React from "react";
import useStyles from "./ApplicationPage.styles";
import UploadFileComponent from "./UploadFileComponent";
import { Button, TextField, CircularProgress } from "@mui/material";
import applicationService from "../../services/applicationService";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import SessionHelper from "../../helpers/SessionHelper";

function ApplicationPage() {
  const classes = useStyles();
  const [files, setFiles] = React.useState([]);
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("info");
  const user = SessionHelper.getUser();
  const hasApplied = user?.hasApplied;

  const init = React.useCallback(async () => {
    let temp = [];
    try {
      setLoading2(true);
      const resp = await applicationService.getApplicationById(
        user?.studentNumber
      );

      if (resp.status !== 200) {
        setSnackbarMessage(resp?.data?.error?.message);
        setSnackbar(true);
        setSeverity("error");
      } else {
        const data = resp?.data?.paths;

        for (let index = 0; index < data.length; index++) {
          const filePath = data[index];
          const fileName = filePath.split("pdfs/")[1];
          const convertedFile = {
            name: fileName,
            dataURL: filePath,
          };
          temp[index] = convertedFile;
        }
        setFiles(temp);
      }
      setLoading2(false);
    } catch (error) {
      console.error(error);
    }
  }, [
    applicationService,
    setSnackbar,
    setSnackbarMessage,
    setSeverity,
    setFiles,
    user,
  ]);

  React.useEffect(() => {
    init();
  }, [init, hasApplied]);

  const handleFileUpload = (e, index) => {
    if (e.target.files[0].type !== "application/pdf") {
      setSnackbarMessage("Please upload only pdf files!");
      setSnackbar(true);
      setSeverity("error");
    } else {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index] = e.target.files[0];
        return updatedFiles;
      });
    }
  };

  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles[index] = [];
      return updatedFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      files[0].length === 0 ||
      files[1].length === 0 ||
      files[2].length === 0
    ) {
      setSnackbarMessage("Please upload all the required files");
      setSnackbar(true);
      setSeverity("error");
    } else {
      setLoading(true);
      const formData = new FormData();

      formData.append("files1", files[0]);
      formData.append("files2", files[1]);
      formData.append("files3", files[2]);

      formData.append("studentid", user?.studentNumber);
      formData.append("notes", text);
      const res = await applicationService.apply(formData);
      if (res?.status === 200) {
        setSnackbarMessage("Your application has been successfully sent!");
        setSnackbar(true);
        setSeverity("success");
        const userData = JSON.parse(user);

        // Update the value of hasVoted field
        userData.hasVoted = 1;

        // Convert the updated object to a JSON string
        const updatedData = JSON.stringify(userData);

        // Set the updated JSON string back in the localStorage
        SessionHelper.setUser(updatedData);
      } else {
        setSnackbarMessage(res?.data?.error?.message);
        setSnackbar(true);
        setSeverity("error");
      }
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div>
      <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={snackbarMessage}
        severity={severity}
      />
      <h2>Application Form for Deparment Candidacy</h2>
      <div className={classes.applicationForm}>
        {
          <UploadFileComponent
            text={"Proof of not being a member of any political parties"}
            index={0}
            handleFileUpload={handleFileUpload}
            handleDeleteFile={handleDeleteFile}
            files={files[0]}
            disabled={hasApplied}
            loading={loading2}
          />
        }
        {
          <UploadFileComponent
            text={"Proof of not having a criminal record"}
            index={1}
            handleFileUpload={handleFileUpload}
            handleDeleteFile={handleDeleteFile}
            files={files[1]}
            disabled={hasApplied}
            loading={loading2}
          />
        }
        {
          <UploadFileComponent
            text={
              "Proof of not having any affiliation with terorist organization"
            }
            index={2}
            handleFileUpload={handleFileUpload}
            handleDeleteFile={handleDeleteFile}
            files={files[2]}
            disabled={hasApplied}
            loading={loading2}
          />
        }
        <TextField
          className={classes.textField}
          label={"Notes"}
          placeholder={"extra comments here..."}
          value={text}
          name="message"
          margin="none"
          variant="outlined"
          multiline
          fullWidth
          minRows={6}
          onChange={(e) => {
            setText(e.target.value);
          }}
          sx={{
            maxWidth: "500px",
            marginTop: "2rem",
            backgroundColor: "white",
            "& .MuiInputLabel-root.Mui-focused": {
              color: "red",
            },
            "& .MuiInputBase-root.Mui-focused": {
              color: "red",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
          }}
          disabled={hasApplied}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "5rem",
          }}
        >
          {loading ? (
            <CircularProgress style={{ color: "#999" }} />
          ) : (
            <Button
              sx={{ display: "block", width: "110px" }}
              type="submit"
              variant="contained"
              color="error"
              size="large"
              component="a"
              onClick={handleSubmit}
              disabled={hasApplied}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
