import { CircularProgress, Container, CssBaseline } from '@material-ui/core'
import React from 'react'

export default function Loading() {
    return (
        <CssBaseline>
            <Container style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress color="inherit" />
                <h1>Loading...</h1>
            </Container>
        </CssBaseline>
    )
}
