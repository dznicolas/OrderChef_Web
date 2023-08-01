import React from 'react'
import { Table as MuiTable } from '@mui/material'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    table: {
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: 'whitesmoke',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    },
}));

export default function Table(props) {

    const classes = useStyles();

    return (
        <MuiTable className={classes.table}>
            {props.children}
        </MuiTable>
    )
}