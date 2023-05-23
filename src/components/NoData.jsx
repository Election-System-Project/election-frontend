import { Box, Container, CssBaseline, Link, Typography, colors, makeStyles } from '@material-ui/core'
import NoDataImage from '../assets/images/no-data.jpg'
import React from 'react'

const styles = makeStyles((theme) => ({
    box: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        textAlign: 'center'
    },
    img: {
        margin: '0 auto',
        width: '50%',
        height: '50%'
    },
    mainText: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2),
        color: colors.grey[600],
        fontWeight: 'bold'
    },
    subText: {
        marginBottom: theme.spacing(5),
        color: colors.grey[600]
    },
    link: {
        color: '#9a1421',
        fontWeight: 'bold',
        textDecoration: 'underline',
        '&:hover': {
            color: '#9a1421',
            textDecoration: 'underline',
            cursor : 'pointer'
        }
    }
}))

export default function NoData() {
    const classes = styles();
    return (
        <CssBaseline>
            <Container>
                <Box className={classes.box}>
                    <img src={NoDataImage} alt="No Data" className={classes.img} />
                    <Typography variant="h4" align="center" className={classes.mainText}>
                        OOPS!
                    </Typography>
                    <Typography variant="h6" align="center" className={classes.subText}>
                        There is no data to display.
                    </Typography>
                    <Typography variant="p" align="center" className={classes.mainText}>
                        You can go the <Link className={classes.link} href='/'>Home Page</Link> or <Link className={classes.link}>Contact Us</Link> for more information.
                    </Typography>
                </Box>
            </Container>
        </CssBaseline>
    )
}
