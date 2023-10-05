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
import {
  getAttendanceStudentAsync,
  createAttendanceStudentAsync,
} from '../../features/attendance/attendanceThunk';
import { useDispatch } from 'react-redux';
import { updateResponse } from '../../features/response/responseSlice';

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
  const [attendances, setAttendances] = React.useState([]);
  const [date, setDate] = React.useState<Date>();
  console.log('date: ', date);
  console.log('studentID: ', studentID);
  const dispatch = useDispatch();
  React.useEffect(() => {
    (dispatch as any)(getAttendanceStudentAsync({ id: studentID }))
      .unwrap()
      .then((response: any) => {
        setAttendances(response);
      })
      .catch((error: any) => {});
  }, []);

  const createAttendanceSession = () => {
    if (studentID && date) {
      let month = date.getUTCMonth() + 1; //months from 1-12
      let day = date.getUTCDate();
      let year = date.getUTCFullYear();

      let newdate = year + '-' + month + '-' + day;
      console.log('newDate: ', newdate);
      (dispatch as any)(
        createAttendanceStudentAsync({
          id: studentID,
          date: newdate,
        })
      )
        .unwrap()
        .then((response: any) => {
          setButtonLoading(false);
          dispatch(
            updateResponse({
              severity: 'success',
              message: 'با موفقیت حضور دانش آموز در تاریخ مشخص شده تعیین شد.',
              open: true,
            })
          );
        })
        .catch((error: any) => {
          setButtonLoading(false);
          dispatch(
            updateResponse({
              severity: 'error',
              message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
              open: true,
            })
          );
        });
    }
  };

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
                <DatePicker
                  onChange={(e) => {
                    setDate(e.value);
                  }}
                  className={styles.datePickerClass}
                />
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    createAttendanceSession();
                  }}
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