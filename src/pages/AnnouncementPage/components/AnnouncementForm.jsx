import * as React from 'react';
import FormControl from '@mui/base/FormControl';
import { makeStyles } from '@mui/styles';
import { Alert, Box, Button, FormHelperText, MenuItem, TextField } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import announcementService from "../../../services/announcementService"

const useStyles = makeStyles((theme) => ({
  inputControl: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  selectList: {
    minWidth: 120,
    maxHeight: 40,
  },
  content: {
    resize: 'none',
    width: '60%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  btn: {
    padding: theme.spacing(2),
    width: '20%',
    alignSelf: 'flex-end',
  },
}));

const announcementTypes = [
  {
    value: 'general',
    label: 'General Announcement',
  },
  {
    value: 'result',
    label: 'Result Announcement',
  },
]

export default function AnnouncementForm() {

  const classes = useStyles();
  const action = '/announcements/create';

  const history = useHistory();

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [announcementType, setAnnouncementType] = React.useState('');
  const [error, setError] = React.useState(false);

  const onAnnouncementTypeChange = (event) => {
    setAnnouncementType(event.target.value);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onTextChange = (event) => {
    setDescription(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if (title === '' || description === '' || announcementType === '') {
      setError(true);
      return;
    }

    setError(false);

    const data = {
      title: title,
      content: description,
      announcement_type: announcementType
    };

    const res = announcementService.createAnnouncement(data);

    if (!res) {
      if (!res.status === 200) {
        throw new Error("Failed to create announcement!");
      }
    }
    else {
      history.push("/announcements");
    }

  };


  return (
    <form action={action} method='POST' onSubmit={onSubmit} className={classes.form}>
      {
        error &&
        <Alert severity="error" style={{ margin: '10px 10px', width: '40%', }}>
          Please fill all the fields.
        </Alert>
      }
      <FormControl required className={classes.inputControl}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Announcement Type"
            defaultValue={announcementType}
            onChange={onAnnouncementTypeChange}
          >
            {announcementTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormHelperText>Required</FormHelperText>
        </Box>
      </FormControl>
      <FormControl className={classes.inputControl} required>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "25ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="title"
            label="Title"
            variant="outlined"
            defaultValue={title}
            onChange={onTitleChange}
          />
          <FormHelperText>Required</FormHelperText>
        </Box>
      </FormControl>
      <FormControl className={classes.inputControl} required>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "50ch" }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="description"
            label="Description"
            multiline
            required
            rows={5}
            variant="outlined"
            defaultValue={description}
            onChange={onTextChange}
          />
          <FormHelperText>Required</FormHelperText>
        </Box>
      </FormControl>
      <Button type="submit" variant="contained" color="error" endIcon={<SendIcon />} className={classes.btn}>Send</Button>
    </form>
  )
}
