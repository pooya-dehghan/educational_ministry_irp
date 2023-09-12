import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classes from './PermissionModal.module.css';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const PermissionModal = ({
  open = false,
  handleClose = () => {},
  onClickDelete = () => {},
}) => {
  return (
    <Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            شما در حال انجام عملیات حذف هستید
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            کاربر گرامی آیا از انجام عمیلات مطمئن هستید ؟
          </Typography>
          <Grid container className={classes.buttonHolders}>
            <Button onClick={handleClose} variant="contained" size="small">
              لغو
            </Button>
            <Button
              onClick={onClickDelete}
              variant="contained"
              color="error"
              size="small"
            >
              انجام
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default PermissionModal;
