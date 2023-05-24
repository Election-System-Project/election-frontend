import { Box, Icon, Typography, Link, makeStyles } from '@material-ui/core'
import { MenuBook } from '@material-ui/icons'
import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import { useHistory } from 'react-router-dom'
import announcementService from '../../../services/announcement.service'
import SessionHelper from "../../../helpers/SessionHelper";

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
    checkBox: {
        position: 'absolute',
        right: '10px',
    },
}));

export default function AnnouncementItem({ id, value, type }) {

    const [checked, setChecked] = React.useState(false);

    const history = useHistory();
    const classes = styles();

    const roles = SessionHelper.getUser().roles;
    const isAdmin = roles?.includes("Admin");
    const isDeansOffice = roles?.includes("DeansOffice");

    const handleChange = async (id) => {
        try {
            const res = await announcementService.removeAnnouncement(id);
            console.log(res);
            if (res) {
                // Item deleted successfully
                history.push("/announcements", { refresh: true });
            } else {
                throw new Error("Failed to delete announcement!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    // redirect to the announcement details page when the user clicks on the read button
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
            {
                (isAdmin || isDeansOffice) &&
                <Box
                    className={classes.checkBox}
                >
                    <Checkbox
                        checked={checked}
                        onChange={() => {
                            setChecked(!checked);
                            handleChange(id);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                            "&.Mui-checked": {
                                color: "#9a1421"
                            }
                        }}
                    />
                </Box>
            }
        </Box>
    )
}
