import React from 'react';
import { useParams } from 'react-router-dom';
import AnnouncementDetailsItem from './components/AnnouncementDetailsItem'
import { Container, CssBaseline } from '@material-ui/core';
import data from './AnnouncementPage';
import NotFound from '../../components/NotFound';

export default function AnnouncementDetailsPage() {

    const { id, title } = useParams();

    // reformats the title to lowercase and replaces the hyphens with spaces
    const newTitle = title.toLowerCase().replace(/-/g, ' ');

    // get the announcement from the announcement list by id
    const announcement = data.find(announcement => announcement.title.toLowerCase() === newTitle)
        .announcementList.find(announcement => announcement.id === parseInt(id));

    // if the announcement is not found, return the NotFound component
    if (!announcement) {
        return <NotFound />
    }

    return (
        <CssBaseline>
            <Container>
                <AnnouncementDetailsItem title={announcement.announceTitle} content={announcement.content} />
            </Container>
        </CssBaseline>
    )
}
