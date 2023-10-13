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
  username: string;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  open,
  handleClose,
  studentID,
  username,
}) => {
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [attendances, setAttendances] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date>();
  const dispatch = useDispatch();
  React.useEffect(() => {
    (dispatch as any)(getAttendanceStudentAsync({ id: studentID }))
      .unwrap()
      .then((response: any) => {
        setAttendances(response.data);
      })
      .catch((error: any) => {});
  }, []);

  const createAttendanceSession = () => {
    if (studentID && date) {
      let month = date.getUTCMonth() + 1; //months from 1-12
      let day = date.getUTCDate();
      let year = date.getUTCFullYear();

      let newdate = year + '-' + month + '-' + day;
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
          let data = response?.date || 'ایراد';
          setAttendances((prevState) => [...prevState, data]);
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
              {`لیست حضور غیاب دانشجو : ${username}`}
            </Typography>
            {attendances.length > 0 ? (
              attendances.map((attendance, index) => {
                return (
                  <Grid container justifyContent={'space-between'}>
                    <Grid item lg={3} md={4} sm={12}>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 1 }}
                      >
                        {attendance}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Checkbox
                        {...label}
                        disabled
                        defaultChecked
                        color="success"
                      />
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <div>لیست حضور غیاب خالی است</div>
            )}
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
