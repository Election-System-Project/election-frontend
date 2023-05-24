import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import AnnouncementDetailsItem from './components/AnnouncementDetailsItem'
import announcementService from '../../services/announcement.service';
import NotFound from '../../components/NotFound';

export default function AnnouncementDetailsPage() {

    const { id, title } = useParams();
    const [data, setData] = useState([]);

    // reformats the title to lowercase and replaces the hyphens with spaces
    const newTitle = title.toLowerCase().replace(/-/g, ' ');

    // fetch the data from the announcement service
    const init = useCallback(async () => {
        await announcementService.fetchData()
            .then((res) => {
                if (!res) {
                    if (!res.status === 200) {
                        throw new Error("Failed to get announcements");
                    }
                }
                else {
                    setData(res.data.array);
                }
            });
    }, [])


    useEffect(() => {
        init();
    }, [init]);


    return (
        <CssBaseline>
            <Container>
                    {data.length !== 0 && data.find(announcement => announcement.title.toLowerCase() === newTitle)
                    .announcementList.map((value) => {
                        if (value.id === parseInt(id)) {
                            return (
                                <AnnouncementDetailsItem
                                    title={value.announceTitle}
                                    content={value.announceContent}
                                />
                            )
                        } else {
                            return null;
                        }

                    })}
                    {data.length === 0 && <NotFound />}
            </Container>
        </CssBaseline>
    )
}
