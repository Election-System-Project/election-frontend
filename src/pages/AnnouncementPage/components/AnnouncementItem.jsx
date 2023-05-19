import { Box, Icon, Typography, Link } from '@material-ui/core'
import { MenuBook } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function AnnouncementItem({ value }) {

    const history = useHistory();

    // redirect to the announcement details page
    const redirect = () => {
        history.push({
            pathname: `/announcement/${value.id}`,
            state: { announcement: value }
        });
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
