import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import resultService from "../../services/result.service";
import Comparator from "./components/Comparator";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import StableSort from "./components/StableSort";
import { Container, CssBaseline } from "@mui/material";

function createData(
    name,
    departmantName,
    grade,
    totalVote
) {
    return {
        name,
        departmantName,
        grade,
        totalVote
    };
}

const rows = [
    createData("Burak Keçeci", "Computer Engineering", 3, 196),
    createData("Malik Hinwani", "Bomputer Enginnering", 1, 165),
    createData("Çağın Tunç", "Domputer Enginnering", 4, 154),
    createData("Melih Çakmak", "Xomputer Enginnering", 2, 1),
    createData("Sude Nur Çevik", "Komputer Enginnering", 3, 173),
    createData("Serdar Sertgöz", "Fomputer Enginnering", 4, 82)
];

export default function ResultApprovementPage({ name }) {
    // const [data, setData] = React.useState({});
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const location = useLocation();

    // const fetchData = useCallback(async () => {
    //     await resultService.fetchData().then((res) => {
    //         if (!res || res.status !== 200) {
    //             throw new Error("Failed to get announcements");
    //         }
    //         //setData(res.data.array);
    //     });
    // }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);

    // useEffect(() => {
    //     if (location.state && location.state.refresh) {
    //         fetchData();
    //     }
    // }, [fetchData, location.state]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    const handleApprove = async (users) => {
        try {
            const res = await resultService.approveUsers(users);
            console.log(res);
            if (res) {
                // Item deleted successfully
                window.location.reload();
            } else {
                throw new Error("Failed to delete announcement!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleReject = async (users) => {
        try {
            const res = await resultService.rejectUsers(users);
            console.log(res);
            if (res) {
                // Item deleted successfully
                window.location.reload();
            } else {
                throw new Error("Failed to delete announcement!");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            StableSort(rows, Comparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <CssBaseline>
            <Container>
                <Box sx={{ width: "100%" }}>
                    <Paper sx={{ width: "100%", mb: 2 }}>
                        <EnhancedTableToolbar
                            numSelected={selected.length}
                            handleApprove={handleApprove}
                            handleReject={handleReject}
                        />
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                                sx={{ cursor: "pointer" }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        onClick={(event) => handleClick(event, row.name)}
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
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">{row.departmantName}</TableCell>
                                                <TableCell align="left">{row.grade}</TableCell>
                                                <TableCell align="left">{row.totalVote}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 53 * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </Container>
        </CssBaseline>
    );
}
