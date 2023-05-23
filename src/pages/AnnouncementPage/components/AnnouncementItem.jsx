import { Box, Icon, Typography, Link, makeStyles } from '@material-ui/core'
import { MenuBook } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

const styles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#cdcdcd',
        padding: '10px',
    },
    link: {
        textDecoration: 'none',
    },
    readBox: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        outline: '1px solid #bbb',
        borderRadius: '5px',
        margin: '0 10px',
        padding: '0px 10px',
        textAlign: 'center',
    },
    icon: {
        marginRight: '8px',
        marginBottom: '8px',
        fontSize: '2rem',
        height: '1.2em',
        position: 'relative',
        bottom: '4px',
    },
}));

export default function AnnouncementItem({ value, type }) {

    const history = useHistory();
    const classes = styles();

    // redirect to the announcement details page when the user clicks on the read button
    // if not, the user will be redirected to the announcement list page
    const redirect = () => {
        // reformats the title to lowercase and replaces the spaces with hyphens
        const title = type.toLowerCase().replace(/\s/g, '-');
        const path = `/announcements/${title}/${value.id}`;
        history.push(path);
    }

    return (
        <Box
            className={classes.box}
        >
            <Box
                className={classes.readBox}
            >
                <Icon
                    className={classes.icon}
                >
                    <MenuBook />
                </Icon>
                <Link
                    className={classes.link}
                    onClick={redirect}
                >
                    Read
                </Link>
            </Box>
            <Typography variant="p">
                {value.announceTitle}
            </Typography>
        </Box>
    )
}
