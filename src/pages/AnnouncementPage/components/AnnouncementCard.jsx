import React from 'react'
import AnnouncementList from './AnnouncementList'
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    paperStyle: {
        padding: 20,
        width: '80%',
        margin: "40px auto",
    },
});

export default function AnnouncementCard({ title, announcementList }) {

    const classes = useStyles();

    return (
        <Paper variant="outlined" elevation={3} className={classes.paperStyle}>
            <AnnouncementList title={title} announcementList={announcementList} />
        </Paper>
    )
}
