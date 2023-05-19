import { Box, Icon, Typography, Link } from '@material-ui/core'
import { MenuBook } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function AnnouncementItem({ value, type }) {

    const history = useHistory();

    // redirect to the announcement details page when the user clicks on the read button
    // if not, the user will be redirected to the announcement list page
    const redirect = () => {
        // reformats the title to lowercase and replaces the spaces with hyphens
        const title = type.toLowerCase().replace(/\s/g, '-');
        const path = `/announcements/${title}/${value.id}`;
        history.push(path);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ccc',
            padding: '10px',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                outline: '1px solid #ccc',
                margin: '0 10px',
                padding: '5px 10px',
                textAlign: 'center',
            }}>
                <Icon style={{ marginRight: '10px', marginBottom: '8px' }}>
                    <MenuBook />
                </Icon>
                <Link
                    style={{
                        textDecoration: 'none',
                    }}
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
