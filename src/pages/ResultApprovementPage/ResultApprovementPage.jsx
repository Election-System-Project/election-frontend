import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, Container, CssBaseline, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router-dom';

function createData(name, status) {
    return { name, status };
}

const rows = [
    createData('Department Representative', "CONTINUE"),
];

export default function ResultApprovementPage() {

    const history = useHistory();

    const handleResultDetails = (name) => {
        const title = name.toLowerCase().split(" ")[0];
        const path = `/approvements/results/${title}`;
        history.push(path);
    }

    return (
        <CssBaseline>
            <Container>
                <Typography 
                variant='h4'
                sx={{
                    margin: "20px 0"
                }}
                >
                    Results
                </Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Election Name</TableCell>
                                <TableCell align="left">Election Status</TableCell>
                                <TableCell align="left">Election Results</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#fff",
                                                color: "#9a1421",
                                                border: "1px solid #9a1421",
                                                width: "60%",
                                                margin: "auto",
                                                ":hover": {
                                                    backgroundColor: "#9a1421",
                                                    color: "#fff"
                                                }
                                            }}
                                            startIcon={<PageviewIcon />}
                                            onClick={() => handleResultDetails(row.name)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </CssBaseline>
    );
}
