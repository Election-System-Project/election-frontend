import { CssBaseline, Divider, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import AnnouncementForm from './components/AnnouncementForm'

export default function AnnouncementCreatePage() {
  return (
    <CssBaseline>
        <Container maxWidth="lg">
          <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Create Announcement
            </Typography>
            <Divider />
            <AnnouncementForm />
          </Paper>
        </Container>
    </CssBaseline>
  )
}
