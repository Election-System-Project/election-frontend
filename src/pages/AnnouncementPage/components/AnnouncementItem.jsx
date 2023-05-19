import { Box, Icon, Typography, Link } from '@material-ui/core'
import { MenuBook } from '@material-ui/icons'
import React from 'react'
// import { Link } from "react-router-native";

var x = `asd{asdasd}`;

export default function AnnouncementItem({ value }) {

    // adding a link to the announcement with replace white space with dash
    const formattedTitle = value.announceTitle.replace(/\s+/g, "-");
    const redirectURL = `/announcements/${formattedTitle}`;

    // redirect to the announcement details page
    const redirect = () => {
        
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
                href= {redirectURL}
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
