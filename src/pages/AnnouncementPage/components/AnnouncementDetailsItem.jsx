import { Divider, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    paperStyle: {
        padding: 20,
        width: '80%',
        margin: "40px auto",
    },
});

export default function AnnouncementDetailsItem({ title, content }) {
    const classes = useStyles();

    return (
    <Paper elevation={3} className={classes.paperStyle}>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
        <Divider />
        <Typography variant="body1" gutterBottom>
            {content}
        </Typography>
    </Paper>
  )
}
