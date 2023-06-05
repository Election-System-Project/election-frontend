import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import resultService from "../../services/result.service";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import { Container, CssBaseline } from "@mui/material";
import { useLocation, useParams } from "react-router-dom"
import { useCallback } from "react";
import { useEffect } from "react";
import NoData from "../../components/NoData";

// function createData(
//     student_id,
//     name,
//     departmantName,
//     grade,
//     totalVote
// ) {
//     return {
//         student_id,
//         name,
//         departmantName,
//         grade,
//         totalVote
//     };
// }

// const rows = [
//     createData("11111114","Burak Keçeci", "Computer Engineering", 3, 196),
//     createData("","Malik Hinwani", "Bomputer Enginnering", 1, 165),
//     createData("","Çağın Tunç", "Domputer Enginnering", 4, 154),
//     createData("","Melih Çakmak", "Xomputer Enginnering", 2, 1),
//     createData("","Sude Nur Çevik", "Komputer Enginnering", 3, 173),
//     createData("", "Serdar Sertgöz", "Fomputer Enginnering", 4, 82)
// ];

export default function ResultApprovementDetailsPage() {
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const location = useLocation();
    const { name } = useParams();

    const fetchData = useCallback(async () => {
        await resultService.fetchData(name).then((res) => {
            if (!res || res.status !== 200) {
                throw new Error("Failed to get announcements");
            }
            setRows(res.data);
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (location.state && location.state.refresh) {
            fetchData();
        }
    }, [fetchData, location.state]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.student_id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, student_id) => {
        const selectedIndex = selected.indexOf(student_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, student_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleApprove = async (name, users) => {
        try {
            let userList = [];
            users.forEach(element => {
                userList.push({
                    student_id: element,
                    is_approved: true
                })
            });
            const res = await resultService.approveUser(name, userList);
            console.log(res);
            if (res) {
                // Users approved successfully
                window.location.reload();
            } else {
                throw new Error("Failed to delete announcement!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleReject = async (name, users) => {
        try {
            let userList = [];
            users.forEach(element => {
                userList.push({
                    student_id: element,
                    is_approved: true
                })
            });
            const res = await resultService.rejectUser(name, userList);
            console.log(res);
            if (res) {
                // Users rejected successfully
                window.location.reload();
            } else {
                throw new Error("Failed to delete announcement!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const isSelected = (student_id) => selected.indexOf(student_id) !== -1;

    return (
        <CssBaseline>
            <Container>
                <Box sx={{ width: "100%" }}>
                    {
                        rows.length !== 0 &&
                        <Paper sx={{ width: "100%", mb: 2 }}>

                            <EnhancedTableToolbar
                                name={name}
                                selectedList={selected}
                                handleApprove={handleApprove}
                                handleReject={handleReject}
                            />
                            <TableContainer>
                                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        onSelectAllClick={handleSelectAllClick}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {rows.map((row, index) => {
                                            const isItemSelected = isSelected(row.student_id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.student_id}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            onClick={(event) => handleClick(event, row.student_id)}
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                "aria-labelledby": labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.student_id}
                                                    </TableCell>
                                                    <TableCell align="left">{row.name}</TableCell>
                                                    <TableCell align="left">{row.department}</TableCell>
                                                    <TableCell align="left">{row.vote_count}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    }
                </Box>
                {
                    rows.length === 0 && <NoData />
                }
            </Container>
        </CssBaseline>
    );
}
