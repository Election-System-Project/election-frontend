import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import think from '../assets/images/think.png';
import SendIcon from '@mui/icons-material/Send';

export default function NotFound() {
  console.log("mrjg");
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}  sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h3">
              Page Not Found
            </Typography>
            <Typography variant="h6" sx = {{
              marginTop: '50px',
              textAlign: 'center',
            }}>
              The page you’re looking for doesn’t exist or an another error occured.
            </Typography>
            <Button variant="contained" href='/' endIcon={<SendIcon />} sx= {{
              marginTop: '20px',
              padding: "10px 15px",
              backgroundColor: "#9a1421",
              color: "#fff",
              ":hover": {
                backgroundColor: "#fff",
                color: "#9a1421"
              }
            }}>Go Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src={think}
              alt=""
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}