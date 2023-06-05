import Checkbox from "@mui/material/Checkbox";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";

const headCells = [
    {
        id: "student_id",
        numeric: false,
        disablePadding: true,
        label: "Student No"
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name"
    },
    {
        id: "departmantName",
        numeric: false,
        disablePadding: false,
        label: "Department Name"
    },
    {
        id: "totalVote",
        numeric: false,
        disablePadding: false,
        label: "Total Vote"
    },
];

function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        numSelected,
        rowCount,
    } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts"
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;