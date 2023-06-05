import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from "@mui/icons-material/FilterList";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

function EnhancedTableToolbar(props) {
    const { numSelected, handleApprove, handleReject } = props;


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        )
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Applications
                </Typography>
            )}

            {numSelected > 0 ? (
                <>

                    <Button
                        sx={{
                            marginLeft: "10px",
                            padding: "10px 20px",
                        }}
                        color="success"
                        variant="contained"
                        startIcon={<TaskAltIcon />}
                        onClick={handleApprove}
                    >
                        <Typography>Approve</Typography>
                    </Button>
                    <Button
                        sx={{
                            margin: "0 20px",
                            padding: "10px 20px",
                        }}
                        color="error"
                        variant="contained"
                        startIcon={<CancelIcon />}
                        onClick={handleReject}
                    >
                        Reject
                    </Button>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

export default EnhancedTableToolbar;