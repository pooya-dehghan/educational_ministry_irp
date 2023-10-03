import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatePicker } from 'zaman';
import Grid from '@mui/material/Grid';
import styles from './attendance.module.css';
import Checkbox from '@mui/material/Checkbox';
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
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
interface AttendanceModalProps {
  open: boolean;
  handleClose: () => void;
  studentID: number;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  open,
  handleClose,
  studentID,
}) => {
  const [buttonLoading, setButtonLoading] = React.useState(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="body1"
              component="h2"
              mb={5}
            >
              لیست حضور غیاب دانشجو : پویا دهقان
            </Typography>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                  8 مهر 1401
                </Typography>
              </Grid>
              <Grid item>
                <Checkbox {...label} defaultChecked color="success" />
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                  9 مهر 1401
                </Typography>
              </Grid>
              <Grid item>
                <Checkbox {...label} defaultChecked color="success" />
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                  11 مهر 1401
                </Typography>
              </Grid>
              <Grid item>
                <Checkbox {...label} defaultChecked color="success" />
              </Grid>
            </Grid>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                  15 مهر 1401
                </Typography>
              </Grid>
              <Grid item>
                <Checkbox {...label} readOnly defaultChecked color="success" />
              </Grid>
            </Grid>
            <Grid container mt={5} justifyContent={'space-between'}>
              <Grid item>
                <DatePicker className={styles.datePickerClass} />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {}}
                  variant="contained"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} color="inherit" />{' '}
                      <Typography
                        style={{ fontSize: '13px', marginRight: '8px' }}
                      >
                        در حال ورود
                      </Typography>
                    </div>
                  ) : (
                    'ثبت'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
