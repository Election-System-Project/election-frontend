import { Button } from "@mui/material";
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
import approvementService from "../../services/applicationApprovement.service";
import Comparator from "./components/Comparator";
import EnhancedTableHead from "./components/EnhancedTableHead";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import StableSort from "./components/StableSort";


function createData(
    student_id,
    name,
    department,
    gpa,
    document1,
    document2,
    document3
) {
    return {
        student_id,
        name,
        department,
        gpa,
        document1,
        document2,
        document3
    };
}






export default function ApplicationApprovementPage() {
    const [rows, setRows] = React.useState([]);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // const location = useLocation();

    // const fetchData = useCallback(async () => {
    //     await approvementService.fetchData().then((res) => {
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



    const fetchData = React.useCallback(async () => {
        try {
            const res = await approvementService.fetchData();
            if (res && res.status === 200) {
                console.log(res.data);
                const newRows = res.data.map((element) =>
                    createData(
                        element.student_id,
                        element.name,
                        element.department,
                        element.grade,
                    )
                );
                setRows(newRows);


            } else {
                throw new Error("Failed to get data");
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

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

    const handleClick = (event, student_id) => {
        const selectedIndex = selected.indexOf(student_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, student_id];
        } else {
            newSelected = selected.filter((selectedId) => selectedId !== student_id);
        }

        setSelected(newSelected);
    };


    const handleApprove = async () => {
        try {
            const selectedUsers = rows.filter((row) => selected.includes(row.student_id));
            console.log(selectedUsers); // Selected users are logged to the console
            approvementService.approveUser(selectedUsers);
            window.location.reload();
        } catch (error) {
            console.error(error);
            // Error handling
        }
    };




    const handleReject = async () => {
        try {
            const selectedUsers = rows.filter((row) => selected.includes(row.student_id));
            console.log(selectedUsers); // Selected users are logged to the console
            approvementService.rejectUser(selectedUsers);
            window.location.reload();
        } catch (error) {
            console.error(error);
            // Error handling
        }
    };

    // const convertToBlob = (data, type) => {
    //     const byteCharacters = atob(data);
    //     const byteArrays = [];

    //     for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    //       const slice = byteCharacters.slice(offset, offset + 512);
    //       const byteNumbers = new Array(slice.length);

    //       for (let i = 0; i < slice.length; i++) {
    //         byteNumbers[i] = slice.charCodeAt(i);
    //       }

    //       const byteArray = new Uint8Array(byteNumbers);
    //       byteArrays.push(byteArray);
    //     }

    //     return new Blob(byteArrays, { type });
    //   };




    const handleDocumentClick = async (event, student_id, document_id) => {
        const res = await approvementService.getDocumentOfUser(student_id);
        console.log(res.data);
        console.log(res?.data.documents[document_id]);
        const byteCharacters = atob(res?.data.documents[document_id]);

        // Convert the decoded string to an array buffer
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob from the array buffer
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Open the file in a new window
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
        // const blob = convertToBlob(res.data, 'application/pdf');
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'converted_file.pdf';
        // link.click();

        //   const res =  approvementService.getDocumentOfUser(student_id).then(blob => {
        //     const downloadUrl = URL.createObjectURL(blob);
        //     const a = document.createElement('a');
        //     a.href = downloadUrl;
        //     a.download = 'document.pdf';
        //     a.click();
        //     URL.revokeObjectURL(downloadUrl);
        //   })
        //   .catch(error => {
        //     console.error('Error downloading PDF:', error);
        //   });
        // const file_paths = res?.data.slice(1, -1);
        // const myFilePaths = file_paths.split("'><");
        // const filePath = myFilePaths[document_id];
        // console.log(filePath);


    };





    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (student_id) => selected.indexOf(student_id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            StableSort(rows, Comparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage, rows]
    );

    return (
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
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.department}</TableCell>
                                        <TableCell align="right">{row.gpa}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={(event) => handleDocumentClick(event, row.student_id, 0)}>View</Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={(event) => handleDocumentClick(event, row.student_id, 1)}>View</Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button onClick={(event) => handleDocumentClick(event, row.student_id, 2)}>View</Button>
                                        </TableCell>
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
    );
}
