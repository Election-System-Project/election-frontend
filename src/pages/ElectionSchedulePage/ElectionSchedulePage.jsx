import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from "react";
import SessionHelper from "../../helpers/SessionHelper";
import applicationService from "../../services/applicationService";
import useStyles from "./ElectionSchedulePage.styles";
import electionScheduleService from "../../services/electionSchedule.service";

const electionTypes = [
    {
        value: "Department",
        label: "Department Representative",
    },
    {
        value: "Faculty",
        label: "Faculty Representative",
    },
];

function ElectionSchedulePage() {
    const classes = useStyles();
    const [electionType, setElectionType] = React.useState("Department");
    const [startDate, setStartDate] = React.useState(dayjs('2022-04-17'));
    const [endDate, setEndDate] = React.useState(dayjs('2022-04-17'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await electionScheduleService.setElectionDates({
            election_type: electionType,
            start_date: startDate.toDate().toISOString(),
            end_date: endDate.toDate().toISOString(),
        });
        if (res.status === 200) {
            console.log("Election dates are set.");
        }
    };

    return (
        <div>
            <h2>Schedule Election</h2>
            <div className={classes.applicationForm}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%",
                        margin: "5rem auto",
                    }}
                >
                    <Grid container spacing={6} sx={{ marginBottom: '20px' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="h6">
                                Election Type
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                                    defaultValue={electionType}
                                    onChange={setElectionType}
                                >
                                    {electionTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={6} sx={{ marginBottom: '20px' }}>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="h6">
                                Election Start Date and Time
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Date and Time *"
                                    value={startDate}
                                    onChange={(newValue) => {
                                        setStartDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>



                    <Grid container spacing={6} >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="h6">
                                Election End Date and Time
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Date and Time *"
                                    value={endDate}
                                    onChange={(newValue) => {
                                        setEndDate(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                </div>
                <Button
                    sx={{ display: "block", width: "200px", float: "right" }}
                    type="submit"
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}

export default ElectionSchedulePage;
