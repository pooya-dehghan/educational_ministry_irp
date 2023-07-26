import * as React from 'react';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomizedSnackbarsProps {
  severity: 'success' | 'info' | 'warning' | 'error'; // Assuming 'severity' is a string with limited options
  message: string;
  handleClose: () => void;
  open: boolean;
}

export default function CustomizedSnackbars({
  severity,
  message,
  handleClose,
  open,
}: CustomizedSnackbarsProps) {
  return (
    <Grid spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
