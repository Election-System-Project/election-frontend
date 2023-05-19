import React from 'react';
import { useLocation } from 'react-router-dom';
import AnnouncementDetailsItem from './components/AnnouncementDetailsItem'
import { Container, CssBaseline } from '@material-ui/core';

export default function AnnouncementDetailsPage() {
    const location = useLocation();
    const { announcement } = location.state;

    return (
        <CssBaseline>
            <Container>
                <AnnouncementDetailsItem title={announcement.announceTitle} content={announcement.content} />
            </Container>
        </CssBaseline>
    )
}
