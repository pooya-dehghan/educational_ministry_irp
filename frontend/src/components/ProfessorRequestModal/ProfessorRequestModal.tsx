import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import classes from './ProfessorRequestModal.module.css';
import CircularProgress from '@mui/material/CircularProgress';

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

const ProfessorRequestModal = ({
  open = false,
  handleClose = () => {},
  onClickReject = () => {},
  onClickAccept = () => {},
  buttonAcceptLoading = false,
  buttonRejectLoading = false,
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
            شما در حال رسیدگی به وضعیت اخذ دانشجو هستید.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            کاربر گرامی آیا از انجام عمیلات مطمئن هستید ؟
          </Typography>
          <Grid
            container
            justifyContent={'space-between'}
            mt={3}
            className={classes.buttonHolders}
          >
            <Button
              onClick={onClickAccept}
              variant="contained"
              color="success"
              size="small"
              disabled={buttonAcceptLoading}
            >
              {buttonAcceptLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} color="inherit" />{' '}
                  <Typography style={{ fontSize: '13px', marginRight: '8px' }}>
                    در حال اخذ درخواست
                  </Typography>
                </div>
              ) : (
                'موافقت با اخذ دانشجو'
              )}
            </Button>
            <Button
              onClick={onClickReject}
              variant="contained"
              color="error"
              size="small"
              disabled={buttonRejectLoading}
            >
              {buttonRejectLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={24} color="inherit" />{' '}
                  <Typography style={{ fontSize: '13px', marginRight: '8px' }}>
                    در حال رد درخواست
                  </Typography>
                </div>
              ) : (
                'رد کردن دانشجو'
              )}
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ProfessorRequestModal;
