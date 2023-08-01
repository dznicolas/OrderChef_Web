import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function Notification(props) {
    const { notify, setNotify, vertical = 'top', horizontal = 'right' } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false,
            vertical: 'top',
            horizontal: 'right',
        });
    };

    return (
        <Snackbar
            autoHideDuration={2000}
            open={notify.isOpen}
            anchorOrigin={{ vertical, horizontal }}
            onClose={handleClose}>
            <Alert variant="filled" severity={notify.color} onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
