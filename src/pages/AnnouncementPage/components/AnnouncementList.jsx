import { List, Typography, Box, Divider } from '@material-ui/core'
import AnnouncementItem from './AnnouncementItem'
import NoData from '../../../components/NoData'
import React from 'react'
import { Campaign } from '@mui/icons-material'

export default function AnnouncementList({ title, announcementList }) {

    

    return (
        <Box>
            <Box display={'flex'} alignItems={'center'}>
                <Campaign style={{ width: '60px', height: '60px', marginRight: '20px' }} />
                <Typography variant="h5" component="h2" gutterBottom>
                    {title}
                </Typography>
            </Box>
            <Divider />
            <List>
                {
                    Object.keys(announcementList).length === 0 ?
                        <Typography variant="h6" component="h2" gutterBottom style={{textAlign:'center', color:'grey'}}> No Data </Typography> :
                        announcementList.map((value) =>
                            <AnnouncementItem type={title.toLowerCase()} value={value} key={value.id} id={value.id} />
                        )
                }
            </List>
        </Box>
    )
}
